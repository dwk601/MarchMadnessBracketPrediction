import pandas as pd
import os
from typing import List, Dict, Any, Optional, Tuple

class CsvDatabase:
    """A class that handles CSV file operations as if they were database tables"""
    
    def __init__(self, data_dir: str):
        self.data_dir = data_dir
        
    def get_available_datasets(self) -> List[str]:
        """Get list of available CSV files (without extension)"""
        return [f.replace(".csv", "") for f in os.listdir(self.data_dir) if f.endswith(".csv")]
    
    def dataset_exists(self, dataset_name: str) -> bool:
        """Check if a dataset exists"""
        csv_path = os.path.join(self.data_dir, f"{dataset_name}.csv")
        return os.path.exists(csv_path)
        
    def read_dataset(self, dataset_name: str, limit: int = None, offset: int = 0) -> Tuple[pd.DataFrame, int]:
        """Read a dataset with optional pagination"""
        csv_path = os.path.join(self.data_dir, f"{dataset_name}.csv")
        df = pd.read_csv(csv_path)
        total_records = len(df)
        
        if limit is not None:
            df = df.iloc[offset:offset+limit]
            
        return df, total_records
    
    def get_columns(self, dataset_name: str) -> List[str]:
        """Get column names for a dataset"""
        csv_path = os.path.join(self.data_dir, f"{dataset_name}.csv")
        df = pd.read_csv(csv_path)
        return df.columns.tolist()
    
    def query_dataset(
        self, 
        dataset_name: str, 
        filters: Optional[str] = None,
        sort_by: Optional[str] = None,
        limit: Optional[int] = None, 
        offset: int = 0
    ) -> Tuple[pd.DataFrame, int]:
        """Query a dataset with filters and sorting"""
        csv_path = os.path.join(self.data_dir, f"{dataset_name}.csv")
        df = pd.read_csv(csv_path)
        
        # Apply filters if provided
        if filters:
            df = df.query(filters)
        
        # Apply sorting if provided
        if sort_by:
            if sort_by.startswith("-"):
                df = df.sort_values(by=sort_by[1:], ascending=False)
            else:
                df = df.sort_values(by=sort_by)
        
        total_records = len(df)
        
        # Apply pagination
        if limit is not None:
            df = df.iloc[offset:offset+limit]
        
        return df, total_records
    
    def create_dataset(self, dataset_name: str, data: List[Dict[str, Any]]) -> None:
        """Create a new dataset from a list of dictionaries"""
        csv_path = os.path.join(self.data_dir, f"{dataset_name}.csv")
        df = pd.DataFrame(data)
        df.to_csv(csv_path, index=False)
        
    def update_dataset(self, dataset_name: str, data: List[Dict[str, Any]]) -> None:
        """Replace an existing dataset with new data"""
        self.create_dataset(dataset_name, data)
        
    def append_to_dataset(self, dataset_name: str, data: List[Dict[str, Any]]) -> None:
        """Append records to an existing dataset"""
        csv_path = os.path.join(self.data_dir, f"{dataset_name}.csv")
        existing_df = pd.read_csv(csv_path)
        new_df = pd.DataFrame(data)
        combined_df = pd.concat([existing_df, new_df])
        combined_df.to_csv(csv_path, index=False)