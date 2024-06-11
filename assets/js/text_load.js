function myFunction() {
    if (window.jQuery) {
        var verJquery = jQuery.fn.jquery;
        // выведем версию jQuery в консоль
        console.log(verJquery);
      }
      const pageWidth = document.documentElement.scrollWidth;
      


    ReaderInFile(".assets/practik/1_1.docx");
    //Height();
    var image1 = document.getElementById('book');
    image1.width = pageWidth-362;
    var image2 = document.getElementById('book2');
    image2.width = pageWidth-362;
    var image3 = document.getElementById('book3');
    image3.width = pageWidth-362;
    const pageHeight = document.documentElement.scrollHeight;
    console.log(pageHeight);
    var cont = document.getElementById('myContainer').style.height;
    console.log(cont);
    image2.height = 1048;

}

function Pages() {
    var page = document.getElementById('fileR2');
    console.log(page);
    page.width = 1080;
    page.height = 1100;
  
    
    }
    
function Height() {
    const pageHeight = document.body.scrollHeight;
    console.log(pageHeight);
    var image = document.getElementById('book2');
    let cont = document.getElementById('text').clientHeight;
    console.log(cont);
    image.height = 1024;
}

function ReaderInFile(nameFile) {
    loadFile(
        nameFile,
        function (error, content) {
            if (error) {
                throw error;
            }
            const zip = new PizZip(content);
            const xml = str2xml(zip.files["word/document.xml"].asText());
            const paragraphsXml = xml.getElementsByTagName("w:p");
            console.log(paragraphsXml[0],paragraphsXml[4]);
            let countImage=1;
            for (let i=0;i<paragraphsXml.length;i++) {
                if (paragraphsXml[i].getElementsByTagName("w:pStyle").length== 1) {
                    console.log (i + " "+ paragraphsXml[i].getElementsByTagName("w:pStyle").length);
                    let fullText = "";
                    const textsXml = paragraphsXml[i].getElementsByTagName("w:t");
                    for (let j = 0, len2 = textsXml.length; j < len2; j++) {
                        const textXml = textsXml[j];
                        if (textXml.childNodes) {
                            fullText += textXml.childNodes[0].nodeValue;
                        }
                    }
                    $('#myContainer').append('<h1>' + fullText + '</h1>');
                } else {
                let fullText = "";
                const textsXml = paragraphsXml[i].getElementsByTagName("w:t");
                for (let j = 0, len2 = textsXml.length; j < len2; j++) {
                    const textXml = textsXml[j];
                    if (textXml.childNodes) {
                        fullText += textXml.childNodes[0].nodeValue;
                    }
                }
                if (fullText==""){
                    let nameFile = "word/media/image"+countImage + ".png";
                    let image = zip.files[nameFile];
                    var reader  = new FileReader();
                    var blod = new Blob([image.asArrayBuffer()], {type: 'image/png'});
                    if (image) {
                        reader.readAsDataURL(blod);
                    }
                    let url=URL.createObjectURL(blod);
                    $('#myContainer').append('<img class="images" align="middle"  src="' + url + '" alt="">');
                    countImage=countImage+1;
                }
                if (fullText[0]+fullText[1]+fullText[2]+fullText[3]+fullText[4] == "Рисун") {
                    $('#myContainer').append('<p class="images">' + fullText + '</p>');
                }else 
                $('#myContainer').append('<p>' + fullText + '</p>');
            }
            }
            }
        );
        
    }

function loadFile(url, callback) {
        PizZipUtils.getBinaryContent(url, callback);
    }

function img2xml(img) {

    
            return new DOMParser().parseFromString(img, "image/svg+xml");
    }

function ReaderText() {
    console.log("Функция запустилась");
    $.get('text_load/1_1.docx', function(data) {
        /*if (lines.charCodeAt(0) === 65279) {
            // BOM sequence*/
            //lines = lines.substr(1);
        //}
                
        var dom = new DOMParser().parseFromString(lines, "text/xml");    
        var lines = data.split("\n");
        //console.log(lines);
        //PizZipUtils.getBinaryContent(lines);
        console.log(dom);
        $.each(lines, function(n, elem) {
           $('#myContaine').append('<p>' + elem + '</p>');
        });
    });



}



function str2xml(str) {
    if (str.charCodeAt(0) === 65279) {
        // BOM sequence
        str = str.substr(1);
    }
    return new DOMParser().parseFromString(str, "text/xml");
}

function getParagraphs(content) {
    const zip = new PizZip(content);
    const xml = str2xml(zip.files["word/document.xml"].asText());
    const paragraphsXml = xml.getElementsByTagName("w:p");
    const paragraphs = [];

    for (let i = 0, len = paragraphsXml.length; i < len; i++) {
        let fullText = "";
        const textsXml =
            paragraphsXml[i].getElementsByTagName("w:t");
        for (let j = 0, len2 = textsXml.length; j < len2; j++) {
            const textXml = textsXml[j];
            if (textXml.childNodes) {
                fullText += textXml.childNodes[0].nodeValue;
            }
        }

        paragraphs.push(fullText);
    }
    return paragraphs;
}
