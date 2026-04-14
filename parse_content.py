import json
import re

def parse_txt_to_json(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    pages = []
    
    # split by URL header which denotes a new page
    # Look for "URL\nhttps://bahrainpainters.com/"
    sections = re.split(r'\bURL\nhttps://bahrainpainters.com/?', content)
    
    for section in sections[1:]: # skip the first part which is intro
        page_data = {}
        
        # Extract slug
        slug_match = re.search(r'^([^\n]+)', section)
        if slug_match:
            slug = slug_match.group(1).strip()
            # If the slug is empty, it's the home page "/"
            if slug == "":
                 slug = "index"
            page_data['slug'] = slug
        else:
            page_data['slug'] = "index"

        # Keyword
        kw_match = re.search(r'Target Keyword\n(.*?)\n', section, re.DOTALL)
        page_data['keywords'] = kw_match.group(1).strip() if kw_match else ""

        # Title
        title_match = re.search(r'Title Tag\n(.*?)\n', section, re.DOTALL)
        page_data['title'] = title_match.group(1).strip() if title_match else ""

        # Meta
        meta_match = re.search(r'Meta Description\n(.*?)\n', section, re.DOTALL)
        page_data['meta'] = meta_match.group(1).strip() if meta_match else ""

        # H1
        h1_match = re.search(r'H1\n(.*?\n)', section)
        page_data['h1'] = h1_match.group(1).strip() if h1_match else ""

        # Body - extracted between H1 and Frequently Asked Questions
        body_match = re.search(r'H1\n.*?\n(.*?)Frequently Asked Questions', section, re.DOTALL)
        if body_match:
            # Clean up the body by removing the new line separators and treating new lines with title case as H2s
            raw_body = body_match.group(1).strip()
            paragraphs = []
            for p in raw_body.split('\n'):
                p = p.strip()
                if not p: continue
                if len(p) < 60 and not p.endswith('.') and not p.endswith(':'): # Likely an H2
                    paragraphs.append({"type": "h2", "text": p})
                else:
                    paragraphs.append({"type": "p", "text": p})
            page_data['body'] = paragraphs
        else:
             page_data['body'] = []

        # FAQs
        faq_match = re.search(r'Frequently Asked Questions.*?\n(Q:.*?)(?=\n\nInternal Linking|\nInternal Linking)', section, re.DOTALL)
        faqs = []
        if faq_match:
            raw_faqs = faq_match.group(1)
            qas = re.findall(r'Q:\s*(.*?)\nA:\s*(.*?)(?=Q:|$)', raw_faqs, re.DOTALL)
            for q, a in qas:
                faqs.append({"q": q.strip(), "a": a.strip()})
        page_data['faqs'] = faqs

        pages.append(page_data)

    return pages

if __name__ == "__main__":
    import sys
    pages = parse_txt_to_json('seo_content.txt')
    with open('src/data/pages.json', 'w', encoding='utf-8') as f:
        json.dump(pages, f, indent=2, ensure_ascii=False)
    print(f"Successfully parsed {len(pages)} pages to JSON.")
