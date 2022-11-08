import json
import os
# grep -o "\"[^\"]*\"" build/risen.html | grep "\(css\|js\)"
def remove_upprintable_chars(s):
    """移除所有不可见字符"""
    return ''.join(x for x in s if x.isprintable())
shellscript = r'rg -oN "[^\"]*(css|js)" build/risen.html'
manifest = ""
buffer = os.popen(shellscript)
assets = buffer.read()
assets = assets.split("\n")
assets = [asset[1:] for asset in assets if asset != ""]
with open("./build/manifest.json", "r") as f:
    manifest = json.load(f)
    manifest["web_accessible_resources"][0]["resources"] = manifest["web_accessible_resources"][0]["resources"] + assets

    
with open("./build/manifest.json", "w") as f:
    json.dump(manifest,f,ensure_ascii=False)

shellscript1 = r'rg -N "[^\"]*(css|js)" build/risen.html'
buffer = os.popen(shellscript1)
html = buffer.read()


js = r'var html = `' + html + r'`' 
js = js + "\n" + r'html = html.split("\n")'
js = js + "\nhtml.forEach(function(item){"
js = js + "\nlet arr = []"
js = js + "\nif(item ===''){"
js = js + "\nreturn;"
js = js + "\n}"
js = js + "\narr.push(item.match('(script|link)')[0])" #arr[0]
js = js + "\narr.push(item.match('(src|href)')[0])" #arr[1]
js = js + "\n" + r'arr.push(item.match("[^\"]*(css|js)")[0])' #arr[2]
js = js + "\narr.push(item.match('(modulepreload|module|stylesheet)')[0])" #arr[3]
js = js + "\nconst risen = document.createElement(arr[0]); "
js = js + "\nif(arr[3] === 'module'){"
js = js + "\nrisen.type = arr[3]"
js = js + "\n}else{"
js = js + "\nrisen.rel = arr[3]"
js = js + "\n}" 
js = js + "\nrisen[arr[1]] = chrome.runtime.getURL(arr[2]);"
js = js + "\n(document.head || document.documentElement).appendChild(risen);"

js = js + "\n})"
js = js + "\n"

shellscript2 = r'find -name "*content\-script*" | xargs rg -oN "[^\"]*.js"'
buffer = os.popen(shellscript2)
content_script = buffer.read();
content_script = remove_upprintable_chars(content_script)
print(content_script)
with open("./build/" + content_script, "a") as f:
    f.write(js)


