function assert(...express){
    const l = express.length;
    const msg = (typeof express[l-1] === 'string')? express[l-1]: 'Assert Error';
    for(let b of express){
        if(!b){
            throw new Error(msg);
        }
    }
}

function randBin(){
    return Math.random() >= 0.5;
}

//const values = '富强民主文明和谐自由平等公正法治爱国敬业诚信友善';
const values = '富强文明和谐公正爱国敬业诚信友善';

function str2utf8(str){
    // return in hex

    const chars = Array.prototype.map.call(str, c=>{
        let u = encodeURIComponent(c);
        if(u === c){
            u = c.codePointAt(0).toString(16);

            assert(u.length === 2);

        }
        return u;
    });

    const concated = chars.join('').replace(/%/g, '').toUpperCase();
    return concated;
}

function utf82str(utfs){
    assert(typeof utfs === 'string', 'utfs Error');

    const l = utfs.length;

    assert((l & 1) === 0);

    const splited = [];

    for(let i = 0; i < l; i++){
        if((i & 1) === 0){
            splited.push('%');
        }
        splited.push(utfs[i]);
    }

    return decodeURIComponent(splited.join(''));
}

function hex2duo(hexs){
    // duodecimal in array of number

    // '0'.. '9' -> 0.. 9
    // 'A'.. 'F' -> 10, c - 10    a2fFlag = 10
    //          or 11, c - 6      a2fFlag = 11
    assert(typeof hexs === 'string')

    const duo = [];

    for(let c of hexs){
        const n = Number.parseInt(c, 16);
        duo.push(n);
    }
    /*for(let c of hexs){
        const n = Number.parseInt(c, 16);
        duo.push(n);
        if(n < 10){
            duo.push(n);
        }else{
            if(randBin()){
                duo.push(10);
                duo.push(n - 10);
            }else{
                duo.push(11);
                duo.push(n - 6);
            }
        }
    }*/
    return duo;
}

function duo2hex(duo){
    assert(duo instanceof Array);

    const hex = [];

    const l = duo.length;

    let i = 0;

    while(i < l){
        hex.push(duo[i]);
        i++;
    }
    return hex.map(v=>v.toString(16).toUpperCase()).join('');
}


function duo2values(duo){
    //return duo.map(d=>values[2*d]+values[2*d+1]).join('');
    return duo.map(d=>values[d]).join('');
}

function valuesDecode(encoded){
    const duo = [];

    for(let c of encoded){
        const i = values.indexOf(c);
        duo.push(i);
    }
    
    const hexs = duo2hex(duo);

    assert((hexs.length & 1) === 0);

    let str;
    try{
        str = utf82str(hexs);
    }catch(e){
        throw e;
    }
    return str;
}


function valuesEncode(str){
    return duo2values(hex2duo(str2utf8(str)));
}

// ------------------

const decodedArea = document.getElementById('decoded-area');
const encodedArea = document.getElementById('encoded-area');
const decodeBtn = document.getElementById('decode-btn');
const encodeBtn = document.getElementById('encode-btn');

encodeBtn.addEventListener('click', e=>{
    encodedArea.value = '';
    const encoded = valuesEncode(decodedArea.value);
    encodedArea.value = encoded;
});

decodeBtn.addEventListener('click', e=>{
    decodedArea.value = '';
    const decoded = valuesDecode(encodedArea.value);
    decodedArea.value = decoded;
});