from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_methods=["*"],
    allow_headers=["*"],
)

INVENTORY = {
    "electronics": [
        {"id": 101, "name": "Wireless Headphones", "price": "₹2,999"},
        {"id": 102, "name": "Smart Watch", "price": "₹4,499"}
    ],
    "clothes": [
        {"id": 201, "name": "Denim Jacket", "price": "₹1,899"},
        {"id": 202, "name": "Running Shoes", "price": "₹3,299"}
    ],
    "books": [
        {"id": 301, "name": "Atomic Habits", "price": "₹399"},
        {"id": 302, "name": "Deep Work", "price": "₹450"}
    ]
}

@app.get("/api/recommend/{category}")
def get_recommendations(category: str):
    cat = category.lower()

    recommendations = INVENTORY.get(cat, [])
    
    return {
        "selected_category": category,
        "items": recommendations
    }
