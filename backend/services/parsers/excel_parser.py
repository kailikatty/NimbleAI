import pandas as pd

def extract_excel(file):
    try:
        df = pd.read_excel(file)
        return df.to_string()
    except Exception as e:
        return f"Error reading Excel file: {str(e)}"
