import os
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

url = os.environ.get("SUPABASE_URL")
key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")

if not url or not key:
    print("Error: Missing env vars")
    exit()

supabase: Client = create_client(url, key)

print(f"Checking DB at: {url}")

response = supabase.table("documents").select("*").execute()

print(f"Total documents: {len(response.data)}")
print("-" * 50)

found_ghosts = False
for doc in response.data:
    if "0utcast" in doc['content'] or "Faizaan" in doc['content']:
        print(f"🚨 FOUND GHOST DATA (ID: {doc['id']}): {doc['content']}")
        found_ghosts = True
        # Kill it
        supabase.table("documents").delete().eq("id", doc['id']).execute()
        print("   -> DELETED")
    
if not found_ghosts:
    print("✅ No ghost data ('0utcast' or 'Faizaan') found.")
print("-" * 50)
