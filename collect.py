import os
import shutil
import unicodedata
from traceback import print_exc

emojis = ["💖", "💘", "💝", "💞", "❣", "✨"]
in_path: str = r"C:\Users\Ryan\Downloads\apple-emoji-linux\png\160"
out_path: str = "./src/assets/emojis/"
verified: int = 0
moved: int = 0

if not os.path.exists(in_path):
    raise FileNotFoundError("In Directory does not exist.")

# Ensure out directory has been created
if not os.path.exists(out_path):
    os.makedirs(out_path)

print(f'In Directory: {in_path}')
print(f'Out Directory: {out_path}')
print('Emojis: ' + ' '.join(emojis))

for emoji in emojis:
    emoji_codepoint: str = hex(ord(emoji))
    source_filename = 'emoji_u{0}.png'.format(emoji_codepoint[2:])
    emoji_name = unicodedata.name(emoji)
    dump_filename = '_'.join(emoji_name.lower().split()) + '.png'

    source_path = os.path.join(in_path, source_filename)
    dump_path = os.path.join(out_path, dump_filename)
    valid = os.path.exists(source_path)

    print('{emoji} ({codepoint}) => {filename} ({valid}) => {dump_filename}'.format(
            emoji=emoji, codepoint=emoji_codepoint, filename=source_filename, dump_filename=dump_filename,
            valid='Found' if valid else 'Not Found'
    ))

    # Copy the emoji image
    if valid:
        verified += 1
        if not os.path.exists(dump_path):
            try:
                shutil.copy(source_path, dump_path)
                moved += 1
            except Exception:
                print_exc()

print(f'{verified} emojis successfully found. {moved} moved into out directory.')
