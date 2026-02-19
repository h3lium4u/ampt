import os
from sentence_transformers import SentenceTransformer
from supabase import create_client, Client

# ==========================================
# CONFIGURATION
# ==========================================
# Get these from your Supabase Project Settings > API
SUPABASE_URL = "https://bkacjddrvagbzvxudbim.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJrYWNqZGRydmFnYnp2eHVkYmltIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTUwNTYzNywiZXhwIjoyMDg3MDgxNjM3fQ.5gd8sHp4Hk21JDm2PQZJwlAPuy0eeYqZSexyxoENU0A" # Use Service Role key to bypass RLS

# Using a free local model (384 dimensions)
embedding_model = SentenceTransformer('all-MiniLM-L6-v2')

# Your Resume Data - Broke down into clear sections
RESUME_CHUNKS = [

    {
        "content": "Amala Vinobia is a Bachelor of Information Technology student at Kalasalingam University (2022–2026) with a CGPA of 8.49. She is passionate about web development, software applications, and AI-based systems.",
        "metadata": {"section": "about"}
    },

    {
        "content": "She is a quick learner with strong problem-solving skills, adaptability, communication skills, and teamwork ability. She aims to apply theoretical knowledge into real-world software projects and build a successful IT career.",
        "metadata": {"section": "about"}
    },

    {
        "content": "Amala completed her SSLC and HSC at St. Thomas Matriculation Higher Secondary School (2008–2022). She scored 71% in SSLC and 75% in HSC.",
        "metadata": {"section": "education"}
    },

    {
        "content": "She is currently pursuing a Bachelor of Information Technology at Kalasalingam University with a CGPA of 8.49 (2022–2026).",
        "metadata": {"section": "education"}
    },

    {
        "content": "Amala worked as an Intern at Kaashiv InfoTech from May 2024 to July 2024. She gained practical exposure in real-time development environments and improved her hands-on programming skills.",
        "metadata": {"section": "experience"}
    },

    {
        "content": "During her internship, she worked on technical projects, attended sessions on emerging technologies, and enhanced her understanding of real-world IT applications.",
        "metadata": {"section": "experience"}
    },

    {
        "content": "She developed a Stock Manager Application designed to manage IT lab equipment. The system displays item availability, handles complaints, and updates stock records to improve lab management efficiency and transparency.",
        "metadata": {"section": "projects"}
    },

    {
        "content": "Amala is currently developing a Multi Face Recognition System using YOLO and FaceNet. The system detects and tracks multiple faces in real-time and generates unique facial embeddings for precise recognition, including differentiation between identical twins.",
        "metadata": {"section": "projects"}
    },

    {
        "content": "Her programming skills include basics of Java, Python, HTML, CSS, and SQL.",
        "metadata": {"section": "skills"}
    },

    {
        "content": "Her technical tools and technologies include Web Development, Microsoft Excel, Microsoft Word, and Adobe Photoshop.",
        "metadata": {"section": "skills"}
    },

    {
        "content": "Amala is proficient in Tamil and English.",
        "metadata": {"section": "languages"}
    },

    {
        "content": "She is based in Thoothukudi, Tamil Nadu, India. Her contact email is amalavinobia3007@gmail.com and she can be reached at +91 9600355375. Her LinkedIn profile is available at linkedin.com/in/amalavinobia.",
        "metadata": {"section": "contact"}
    }

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
    
    # 0. Clear existing data to avoid duplicates/stale data
    print("Clearing old resume data...")
    supabase.table("documents").delete().neq("id", 0).execute() # Hack to delete all rows

    
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
