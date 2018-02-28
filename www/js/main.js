function iniciarJogo() {
    var vez = 1;
    var vencedor = "";
    var cont = 0;

    function casasIguais(a, b, c) {
        var casaA = $("#casa" + a);
        var casaB = $("#casa" + b);
        var casaC = $("#casa" + c);
        var bgA = $("#casa" + a).css("background-image");
        var bgB = $("#casa" + b).css("background-image");
        var bgC = $("#casa" + c).css("background-image");
        if ((bgA == bgB) && (bgB == bgC) && (bgA != "none" && bgA != "")) {
            if (bgA.indexOf("1.png") >= 0)
                vencedor = "1";
            else
                vencedor = "2";
            return true;
        }
        else {
            return false;
        }
    }

    //starta com a vez do jogador 1
    $("#vezJogador").show();
    $("#vezJogador").html(
        "<div class='alert alert-info centralizar'> <strong>Vez do jogador " + vez + "</strong> </div>"
    );

    function verificarFimDeJogo() {
        //testar todas a combinações possiveis
        if (casasIguais(1, 2, 3) || casasIguais(4, 5, 6) || casasIguais(7, 8, 9) ||
            casasIguais(1, 4, 7) || casasIguais(2, 5, 8) || casasIguais(3, 6, 9) ||
            casasIguais(1, 5, 9) || casasIguais(3, 5, 7)
        ) {
            $("#vezJogador").hide(300);
            $("#resultado").show();
            $("#resultado").html(
                "<div class='alert alert-success centralizar'><strong>Parabéns!</strong> O jogador " + vencedor + " venceu! </div>"
            );
            $("#btn_restart").show(300);
            $(".casa").off("click");
        } else { //se der velha
            if (cont == 8) {
                $("#vezJogador").hide(300);
                $("#resultado").show();
                $("#resultado").html(
                    "<div class='alert alert-warning centralizar'> <strong> Deu velha!</strong> </div>"
                );
                $("#btn_restart").show(300);
                $(".casa").off("click");
            } else {
                cont++;
            }
        }
    }

    //adiciona evento de clique em todas as divs com a classe .casa
    $(".casa").click(function () {
        var bg = $(this).css("background-image");
        if (bg == "none" || bg == "") {
            var fig = "url(img/" + vez.toString() + ".png)";

            $(this).css({
                "background": fig,
                "background-size": "75px",
                "background-repeat": "no-repeat",
                "background-position": "center center"
            });
            vez = (vez == 1 ? 2 : 1);
            $("#vezJogador").html(
                "<div class='alert alert-info centralizar'> <strong>Vez do jogador " + vez + "</strong> </div>"
            );
            verificarFimDeJogo();
        }
    });
};

$(function () {
    $("#btn_start").click(function () {
        iniciarJogo();
        $(this).hide(300);
    });
    $("#btn_restart").click(function () {
        $(".casa").css({
            "background": "",
            "background-size": "75px",
            "background-repeat": "no-repeat",
            "background-position": "center center"
        });
        $("#resultado").hide();
        iniciarJogo();
        $(this).hide(300);
    });
})
