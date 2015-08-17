# fsk-font #
将使用AI导出的svg文件转换成字体文件
生成.css、.svg、.tff、.woff、.eot等格式文件

## 安装命令 ##
>npm install -g fsk-font

## 示例 ##
>fsk-font

    //直接使用fsk-font命令,将当前命令行所在目录下的svg转换成字体

### 参数说明 ###
>fsk-font -d /svgs  -t /font -D -f h5icon

    此命令会将/svgs目录及其所有子目录下的svg文件转换成字体文件
    -d --dir 目录
    -D --deep 是否扫描-d目录的子目录
    -f --font 字体名字
    -t --target 生成文件的存放目录

    文件存放到/font目录下;
      /font目录的文件:
      --h5icon.eot
      --h5icon.svg
      --h5icon.ttf
      --h5icon.woff

## 配置 ##
    可以通过修改./lib目录下的config.js文件设置生成文件存放目录的方法
    getTargetDir 文件存放目录
    getWebPath   字体文件在线访问URL目录不需要文件名
    getFontName  字体名
    getCssPath   css文件存放目录
    getHtmlPath  css文档html存放目录
    getHtmlWebUrl  访问html的URL
    getCssWebUrl   css文件的在线引用URL便于在html中引用

## 兼容老的字体文件 ##
    为了兼容已有字体文件, 例如原来的css是
    >.icon {
    >  content: 'a';
    >  font-family: custom;
    >}
    现在还想content为a, 不影响之前的css,有两种办法可以实现:
    1 通过文件命名, 将文件命名为:
    custom~a.svg   或 custom~u0061.svg
    custom将作为新的class name a会作为新字体的codepoint
    2 在存放svg文件的目录下创建mapping.json 内容为:
    >{
    >  "custom": "a"
    >}

## svg文件导出格式 ##

Save your file as SVG with the following settings:

* SVG Profiles: SVG 1.1
* Fonts Type: SVG
* Fonts Subsetting: None
* Options Image Location: Embed
* Advanced Options
    * CSS Properties: Presentation Attributes
    * Decimal Places: 1
    * Encoding: UTF-8
    * Output fewer elements: check

请参考[svgicons2svgfont](https://www.npmjs.com/package/svgicons2svgfont)
