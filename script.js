// 4È14Î24Ç74Ë94Æ04É44Ç54Î24Ç64È04Ç74È24Ë6 file text-content.txt
async function loadTextContent() {
    try {
        const response = await fetch('text-content.txt');
        const text = await response.text();
        document.getElementById('textToCopy').textContent = text;
    } catch (error) {
        console.error('4È44Ë54Ç94É44Ë44Æ54È14Î24Ç74Ë94Æ04É44Ç54Î24Ç64È04Ç74È04Ë44Ç94Ç74Ì5:', error);
        // 4Æ04Í04Ç44Ç54Í54É44Ç54Î24Ç64È04Ç74È74Í04Ç94Ë44Í04Ç04Ì24È4 4È04Î24È64É14Ë54Ç94È04Ì24È44Ë54Ç94É44Ë44Æ54È14Î24Ç74Ë94Æ0 file 4È04Ë44Ç9
        document.getElementById('textToCopy').textContent = '4Æ04Ë44Æ04È44Í34Ì54É14É24Î24É44Ë4';
    }
}

// 4É24Ì9 function 4È24Ì54È74È14Î24Ç74Ë94Æ04Ç74Í04È24Î04È6
loadTextContent();

function copyText() {
    // 4È54Æ04É44Ç54Î24Ç64È04Ç74È24Ë64Ç84Ë44Ç54Ë94Ç04Ì64È74È44Ë44Ç9 id "textToCopy"
    const textToCopy = document.getElementById("textToCopy").textContent;
    
    // 4È04Î24È64Ì2 Clipboard API 4Ç04Ì24È44Î24È04Ë6 copy 4É44Ç54Î24Ç64È04Ç7
    navigator.clipboard.writeText(textToCopy).then(() => {
        // 4È04Æ94Î24Æ54Ì54Æ94É14È44Î24È74Ì54Æ4
        document.getElementById("clickSound").play();
        
        // 4È04Æ44Î24É24Ë44Æ94É14Ë44È64Æ74Ì84Æ24Æ74Î04È5
        const toast = document.getElementById("toast");
        toast.style.display = "block";
        
        // 4È74Ë44Æ04Í54É14Ë44È64È04Ç94Î24Ç74Ë44È04Í54È24Ë6 1.8 4È84Ë54Ç94Ë44Ç74Ë6
        setTimeout(() => {
            toast.style.display = "none";
        }, 1800);
    }).catch(err => {
        console.error("4È44Ë44Ç94È04Æ94Î24É24Ë44Æ04Î24Ç94Ë94Æ44Æ04Ë44È6 copy 4É44Ç54Î24Ç64È04Ç7: ", err);
        // 4È04Î24È64É14Ë54Ç94È04Ì24È44Ë54Ç94É44Ë44Æ5 copy 4È04Ë44Ç9 4È04Î24È64Ì24È84Ë54Ç84Ë64È04Î24È64Ç24Ë54Ç5
        fallbackCopyText(textToCopy);
    });
}

// 4È84Ë54Ç84Ë64È04È44Î24È74Ì64Æ44Æ74Í04Ç94Ì14É14È04Î24È64É14Ë54Ç94È04Ì2 Clipboard API 4È44Ë54Ç94Ç04Í04Ç44Ì24È64Æ04Ë44È6
function fallbackCopyText(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            document.getElementById("clickSound").play();
            const toast = document.getElementById("toast");
            toast.style.display = "block";
            setTimeout(() => {
                toast.style.display = "none";
            }, 1800);
        } else {
            alert("4È44Ë54Ç94É44Ë44Æ5 copy 4É44Ç54Î24Ç64È04Ç74È04Ë44Ç94Ç74Ì54Î4 4É14Ì04È44È24Î24È54Ë44È54Ë44È44È44Î24Ç54Æ44Ç74Ì44Ç54Î4");
        }
    } catch (err) {
        console.error("4È44Ë44Ç94È04Æ94Î24É24Ë44Æ04Î24Ç94Ë94Æ44Æ04Ë44È6 copy: ", err);
        alert("4È44Ë54Ç94É44Ë44Æ5 copy 4É44Ç54Î24Ç64È04Ç74È04Ë44Ç94Ç74Ì54Î4");
    }
    
    document.body.removeChild(textArea);
}†áž áž»ážŸáž€áŸ’áž“áž»áž„áž€áž¶ážšáž…áž˜áŸ’áž›áž„!';
                    bouncingText.style.color = '#f44336';
                    bouncingText.classList.remove('bounce-animation');
                    void bouncingText.offsetWidth;
                    bouncingText.classList.add('bounce-animation');
                    
                    setTimeout(() => {
                        bouncingText.style.color = '#4CAF50';
                    }, 2000);
                });
        };
    </script>
</body>
</html>