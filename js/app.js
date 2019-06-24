/*
    Debounce do Lodash
*/

debounce = function(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

/*
    Animação menu - tabs
*/

$("[data-group]").each(function(){
    var $botao = $(this).find("[data-click]"),
        $alvo = $(this).find("[data-target]"),
        $activeClass = "active";

    $botao.first().addClass($activeClass);
    $alvo.first().addClass($activeClass);

    $botao.click(function(e){
        e.preventDefault();

        $("[data-click]").removeClass($activeClass);
        $("[data-target]").removeClass($activeClass);

        var id = $(this).data("click"),
            $alvoFinal = $("[data-target='" + id + "']");

        $(this).addClass("active");
        $($alvoFinal).addClass("active");
    });
});

/*
    Animação Scroll
*/

$("[data-menu]").each(function(){
    var $botao = $(this).find("[data-link]"),
        $alvo = $(this).find("[data-alvoLink]");

    $botao.click(function(e){
        e.preventDefault();
        var valorBotao = $(this).data("link");
        if(valorBotao == "#topo"){
            animarScroll(0);
        }else {
            var valorConteudo = $("[data-alvoLink = '" + valorBotao + "']"),
                distancia = Math.round(valorConteudo.offset().top);
            animarScroll(distancia);
        }
    });

    function animarScroll(val){
        $("html, body").animate({
            scrollTop: val
        }, 500);
    }
});

/*
    Marcando a seção atual
*/

$("[data-group]").each(function(){
    var alturaSecao = Math.round($(this).innerHeight()),
        topoSecao = Math.round($(this).offset().top),
        linkSecao = $(this).data("alvolink"),
        alvo = $("[data-link='" + linkSecao + "']"),
        header = $("header").innerHeight();

        $(linkSecao).addClass('active');

    $(window).scroll(debounce(function(){
        var alturaPagina = $(this).scrollTop();

        if(alturaPagina > topoSecao - header && topoSecao + alturaSecao - header > alturaPagina) {
            $(alvo).addClass("active");
        } else{
            $(alvo).removeClass("active");
        }
    }, 200));
});
