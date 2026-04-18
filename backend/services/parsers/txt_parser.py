def extract_txt(file):
    try:
        file.seek(0)
        content = file.read()

        if not content:
            return "Empty file"

        try:
            return content.decode("utf-8")
        except:
            return content.decode("latin-1")

    except Exception as e:
        return f"Error reading TXT file: {str(e)}"
