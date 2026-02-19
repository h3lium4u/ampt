import os
from sentence_transformers import SentenceTransformer
from supabase import create_client, Client

# ==========================================
# CONFIGURATION
# ==========================================
# Get these from your Supabase Project Settings > API
SUPABASE_URL = "https://bddqjxwtzwjatnvwahou.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJkZHFqeHd0endqYXRudndhaG91Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTQyNDM4OSwiZXhwIjoyMDg3MDAwMzg5fQ.dXfa5W0aCIvO0MMq-r3nZKQOMwwm9lDRs6Of-_3gc1c" # Use Service Role key to bypass RLS

# Using a free local model (384 dimensions)
embedding_model = SentenceTransformer('all-MiniLM-L6-v2')

# Your Resume Data - Broke down into clear sections
RESUME_CHUNKS = [
    {
        "content": "Faizaan is a Full-stack developer dedicated to building scalable, secure, and stable solutions. He is based in Tirunelveli, India.",
        "metadata": {"section": "about"}
    },
    {
        "content": "Faizaan is currently pursuing B.Tech in Information Technology at Kalasalingam Academy of Research and Education with a CGPA of 8.85/10.",
        "metadata": {"section": "education"}
    },
    {
        "content": "Relevant coursework includes Data Structures and Algorithms, Operating Systems, Database Management Systems, Web Technologies, and Computer Networks.",
        "metadata": {"section": "education"}
    },
    {
        "content": "Faizaan completed a Web Development Internship at Appin Technology, Coimbatore, where he developed a responsive real-time weather forecasting website using HTML and CSS.",
        "metadata": {"section": "experience"}
    },
    {
        "content": "During his internship, he designed a clean UI for live temperature display and gained hands-on experience in scalable front-end development workflows.",
        "metadata": {"section": "experience"}
    },
    {
        "content": "Faizaan has published a research paper titled 'Real-Time Detection of Wrong-Way Vehicles Using YOLO and Image Processing Techniques' in March 2025.",
        "metadata": {"section": "publications"}
    },
    {
        "content": "He also co-authored 'AquaSense: Climate-Aware Smart Irrigation System for Water Efficiency' focusing on intelligent agricultural water management.",
        "metadata": {"section": "publications"}
    },
    {
        "content": "Project: QuickFix – An Android service booking application connecting users with electricians, plumbers, and carpenters using dual authentication and subscription-based access.",
        "metadata": {"section": "projects"}
    },
    {
        "content": "QuickFix enables job posting, service tracking, and booking confirmation through an intuitive mobile interface built using Java, Android Studio, and Firebase.",
        "metadata": {"section": "projects"}
    },
    {
        "content": "Project: Wrong-Way Vehicle Detection & Alert System – A real-time traffic safety system using YOLOv8 and OpenCV with polygon-based zone detection.",
        "metadata": {"section": "projects"}
    },
    {
        "content": "The Wrong-Way system automatically sends email alerts with image attachments, triggers sound alarms, logs violations into Excel, and generates analytical charts using Matplotlib.",
        "metadata": {"section": "projects"}
    },
    {
        "content": "Faizaan's technical expertise includes Python (v3.12), Java, HTML, CSS, FastAPI, MongoDB, Firebase, Android Studio, Git, Kali Linux, and workflow automation using n8n.",
        "metadata": {"section": "skills"}
    },
    {
        "content": "He has strong interests in Cybersecurity, Ethical Hacking, Penetration Testing, Artificial Intelligence, and Graphic Design.",
        "metadata": {"section": "interests"}
    },
    {
        "content": "In my free time, I enjoy music, sports, and gaming. I also spend a significant amount of time debugging my life, but I'm still waiting for the patch notes.",
        "metadata": {"section": "hobbies"}
    },
    {
        "content": "My favorite food is Caffeine and Code. It’s a perfectly balanced diet for a developer, and surprisingly, it has zero calories (if you don't count the stress).",
        "metadata": {"section": "personal"}
    },
    {
        "content": "If you ask about my relationship status: I'm currently in a committed relationship with my compiler. We have our ups and downs, but mostly just syntax errors.",
        "metadata": {"section": "personal"}
    },
    {
        "content": "My secret talent? I can turn pizza into professional-grade software with a 99.9% uptime (and a 100% chance of needing more pizza).",
        "metadata": {"section": "personal"}
    },
]


# ==========================================
# INITIALIZATION
# ==========================================
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

def get_embedding(text: str):
    """Generates a 384-dimensional embedding using a local model."""
    embedding = embedding_model.encode(text)
    return embedding.tolist()

def seed_database():
    print(f"Starting ingestion of {len(RESUME_CHUNKS)} resume chunks...")
    
    for chunk in RESUME_CHUNKS:
        print(f"Processing: {chunk['metadata']['section']} section...")
        
        # 1. Generate the vector embedding
        embedding = get_embedding(chunk['content'])
        
        # 2. Upload to Supabase
        data = {
            "content": chunk["content"],
            "metadata": chunk["metadata"],
            "embedding": embedding
        }
        
        result = supabase.table("documents").insert(data).execute()
        
    print("DONE! Your AI now has memory.")

if __name__ == "__main__":
    if "YOUR_" in SUPABASE_URL:
        print("ERROR: Please fill in your URL first!")
    else:
        seed_database()
