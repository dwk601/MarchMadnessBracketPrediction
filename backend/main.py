from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import os
from typing import List, Dict, Any, Optional
from csv_db import CsvDatabase

app = FastAPI(title="CSV Database API", description="API that uses CSV files as a database")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Path to the data directory
DATA_DIR = "../data"
# Initialize CSV database
csv_db = CsvDatabase(DATA_DIR)

@app.get("/")
def read_root():
    return {"message": "Welcome to the CSV Database API"}

@app.get("/datasets")
def get_available_datasets():
    """Get a list of available datasets (CSV files)"""
    try:
        datasets = csv_db.get_available_datasets()
        return {"datasets": datasets}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error accessing data directory: {str(e)}")

@app.get("/datasets/{dataset_name}")
def get_dataset(dataset_name: str, limit: int = 100, offset: int = 0):
    """Get data from a specific dataset with pagination"""
    if not csv_db.dataset_exists(dataset_name):
        raise HTTPException(status_code=404, detail=f"Dataset '{dataset_name}' not found")
    
    try:
        df, total_records = csv_db.read_dataset(dataset_name, limit, offset)
        
        # Convert to dict for JSON response
        records = df.to_dict(orient="records")
        
        return {
            "dataset": dataset_name,
            "total_records": total_records,
            "limit": limit,
            "offset": offset,
            "records": records
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error reading dataset: {str(e)}")

@app.get("/datasets/{dataset_name}/columns")
def get_dataset_columns(dataset_name: str):
    """Get column names for a specific dataset"""
    if not csv_db.dataset_exists(dataset_name):
        raise HTTPException(status_code=404, detail=f"Dataset '{dataset_name}' not found")
    
    try:
        columns = csv_db.get_columns(dataset_name)
        return {"columns": columns}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error reading dataset: {str(e)}")

@app.get("/datasets/{dataset_name}/query")
def query_dataset(
    dataset_name: str, 
    filters: Optional[str] = None,
    sort_by: Optional[str] = None,
    limit: int = 100, 
    offset: int = 0
):
    """Query a dataset with filters and sorting"""
    if not csv_db.dataset_exists(dataset_name):
        raise HTTPException(status_code=404, detail=f"Dataset '{dataset_name}' not found")
    
    try:
        df, total_records = csv_db.query_dataset(
            dataset_name,
            filters=filters,
            sort_by=sort_by,
            limit=limit,
            offset=offset
        )
        
        # Convert to dict for JSON response
        records = df.to_dict(orient="records")
        
        return {
            "dataset": dataset_name,
            "total_records": total_records,
            "limit": limit,
            "offset": offset,
            "records": records,
            "filters": filters,
            "sort_by": sort_by
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error querying dataset: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)