def extract_txt(file):
    try:
        file.seek(0)  # 🔥 สำคัญมาก
        return file.read().decode("utf-8")
    except:
        file.seek(0)
        return file.read().decode("latin-1")