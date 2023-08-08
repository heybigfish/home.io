//取消http代理
git config --global --unset http.proxy
//取消https代理 
git config --global --unset https.proxy

ipconfig/flushdns

git subtree push --prefix dist origin gh-pages