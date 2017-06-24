$('.collection-item').on('click', function () {
    var $badge = $('.badge', this);

    if ($badge.length === 0) {
        $badge = $('<span class="badge brown-text">0</span>').appendTo(this);
    }

    $badge.text(parseInt($badge.text()) + 1);

    var productName = this.firstChild.textContent;
    Materialize.toast(productName + ' adicionado.', 1000);
});

$('#confirm').on('click', function () {
    var text = '';
    $('.badge').parent().each(function () {
        var product = this.firstChild.textContent;
        var qtd = this.lastChild.textContent;

        text += product + ': ' + qtd + ', ';
    });
    $('#resume').text(text);
});

$('.collection').on('click', '.badge', function () {
    if (this.textContent === '2') {
        $(this).remove();
        return;
    }
    this.textContent = (parseInt(this.textContent) - 2).toString();
});

$('.acao-limpar').on('click', function () {
    $('#table-number').val('');
    $('.badge').remove();
});

$('.modal-trigger').leanModal();

$('.acao-finalizar').on('click', function () {
    $.ajax({
        url: 'http://cozinhapp.sergiolopes.org/novo-pedido',
        data: {
            mesa: $('#table-number').val(),
            pedido: $('#resume').text()
        },
        error: function (err) {
            Materialize.toast(err.responseText, 3000, 'red-text');
        },
        success: function (result) {
            Materialize.toast(result, 2000);
            $('#table-number').val('');
            $('.badge').remove();
        }
    });
});