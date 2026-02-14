function addition(){
    var a = document.getElementById("t1").value;
    var b = document.getElementById("t2").value;
    var c = Number(a)+Number(b);

    t3.value = c;
}

function soustraction(){
    var a = document.getElementById("t1").value;
    var b = document.getElementById("t2").value;
    var c = Number(a)-Number(b);

    t3.value = c;
}

function multiplication(){
    var a = document.getElementById("t1").value;
    var b = document.getElementById("t2").value;
    var c = Number(a)*Number(b);

    t3.value = c;
}

function division(){
    var a = Number(document.getElementById("t1").value);
    var b = Number(document.getElementById("t2").value);

    if (b === 0) {
        document.getElementById("t3").value = "Erreur : division par 0";
    } else {
        var c = a / b;
        document.getElementById("t3").value = c;
    }
}

function reset() {
    document.getElementById("t1").value = "";
    document.getElementById("t2").value = "";
    document.getElementById("t3").value = "";
    document.getElementById("t4").value = "";
}


function permute(){
    var v3 = "";
    a = document.getElementById("t1").value;
    b = document.getElementById("t2").value;
    v3=a;
    a=b;
    b=v3;

    t1.value = a;
    t2.value = b;
}

function parite(){
    var v;
    v = document.getElementById("t3").value;
    if(v%2==0)
        t4.value = ("Pair")
    else
        t4.value = ("Impair")
}
