import os
# لو فيه ملف قديم بنفس اسم الفولدر شيله
for folder in ['al-bayan', 'al-manhaj']:
    if os.path.isfile(folder):
        os.rename(folder, folder + '.bak_file')
        print(f'renamed file {folder} -> {folder}.bak_file')
    os.makedirs(folder, exist_ok=True)

# رتب الباقي
os.makedirs('HarasAlLisan/al-bayan', exist_ok=True)
print('organize OK - 6236 skeleton ready')
