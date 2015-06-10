# fsk-font #
将使用AI导出的svg文件转换成字体文件
生成.css、.svg、.tff、.woff、.eot等格式文件
##安装命令##
>npm install -g fsk-font
##示例##
    >fsk-font
    //直接使用ai2font命令,将当前命令行所在目录下的svg转换成字体
  ###参数说明###
    -d --dir 目录
    -D --deep 是否扫描-d目录的子目录
    -f --font 字体名字
    -t --target 生成文件的存放目录
    >fsk-font -d /svgs  -t /font -D -f h5icon
      此命令会将/svgs目录及其所有子目录下的svg文件转换成字体文件
      并存放到 /font目录下;
      /font目录的文件:
      --h5icon.eot
      --h5icon.svg
      --h5icon.ttf
      --h5icon.woff
##配置##
    可以通过修改./lib目录下的config.js文件设置生成文件存放目录的方法
    getTargetDir 文件存放目录
    getWebPath   字体文件在线访问URL目录不需要文件名
    getFontName  字体名
    getCssPath   css文件存放目录
    getHtmlPath  css文档html存放目录
    getHtmlWebUrl  访问html的URL
    getCssWebUrl   css文件的在线引用URL便于在html中引用
