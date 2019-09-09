function ProveedoresModel() {
    let idProveedor = "", proveedor = "", monto = "", moneda = "", fecha = "", comentario = "";
}

$(document).ready(function () {
    $('#loader').hide();

    $("#proveedoresTabla").DataTable({
        "info": false,
        "lengthChange": false,
        "drawCallback": function () {
            proveedoresReset();
        },
        "ajax": {
            "url": "https://localhost:44352/api/proveedores",
            "type": "GET",
            "datatype": "json"
        },
        "columns": [
            { "data": "idProveedor" },
            { "data": "proveedor" },
            { "data": "monto" },
            { "data": "moneda" },
            {
                "data": "fecha",
                "render": function (data) {
                    if (data === null) return "";
                    return moment(data).format('DD/MM/YYYY');
                }
            },
            { "data": "comentario" },
            { "data": "idProveedor", "render": function (data) {
                return "<button type='button' class='btn btn-success btn-sm' onclick=proveedoresEditRow(" + data + ")><i class='fas fa-edit'></i></button>&nbsp;<div class='btn btn-danger btn-sm' style='cursor:pointer;' onclick=proveedoresConfirm(" + data + ")><i class='fas fa-trash-alt'></i></div>"
                },
                "orderable": false,
                "searchable": false,
                "className": 'text-center'
            }
        ]
    });
});

function proveedoresEditRow(data) {
    $('#proveedoresGuardar').text('Actualizar');

    $('#proveedoresTabla tbody').on('click', 'button', function () {
        let table = $('#proveedoresTabla').DataTable();
        let row = table.row($(this).parents('tr')).data();

        $('#proveedoresProveedor').val(row.proveedor);
        $('#proveedoresMonto').val(row.monto);
        $('#proveedoresMoneda').val(row.moneda);
        $('#proveedoresFecha').val(moment(row.fecha).format("DD-MM-YYYY"));
        $('#proveedoresComentario').val(row.comentario);
        $('#proveedoresId').val(data);
    });
}

$('#proveedoresGuardar').click(function () {
    if ($('#proveedoresGuardar').text() == 'Guardar') {
        proveedoresPOST();
    }
    if ($('#proveedoresGuardar').text() == 'Actualizar') {
        proveedoresPUT();
    }
});

function proveedoresPOST() {
    let modelView = new ProveedoresModel();
    modelView.proveedor = $('#proveedoresProveedor').val();
    modelView.monto = $('#proveedoresMonto').val();
    modelView.moneda = $('#proveedoresMoneda').val();
    modelView.fecha = $('#proveedoresFecha').val();
    modelView.comentario = $('#proveedoresComentario').val();

    $.ajax({
        url: 'https://localhost:44352/api/proveedores',
        type: 'POST',
        async: 'true',
        cache: 'false',
        data: JSON.stringify(modelView),
        crossDomain: true,
        contentType: 'application/json',
        beforeSend: function () {
            $(document).ready(function () {
                $('#loader').show();
            });
        },
        complete: function () {
            $('#loader').hide();
        },
        error: function (xhr, httpStatusMessage, customMessage) {
            if (xhr.status === 500) {
                $('#errorModalMsg').text(customMessage);
                $('#errorModal').modal('show');
                proveedoresReset();
                $('#loader').hide();
            }
        },
        success: function () {
            proveedoresPostSuccess();
            $('#proveedoresTabla').DataTable().ajax.reload();
            proveedoresReset();
            $('#loader').hide();
        }
    });
}

function proveedoresPUT() {
    let modelView = new ProveedoresModel();
    modelView.idProveedor = $('#proveedoresId').val();
    modelView.proveedor = $('#proveedoresProveedor').val();
    modelView.monto = $('#proveedoresMonto').val();
    modelView.moneda = $('#proveedoresMoneda').val();
    modelView.fecha = $('#proveedoresFecha').val();
    modelView.comentario = $('#proveedoresComentario').val();

    let id = $('#proveedoresId').val();

    $.ajax({
        url: 'https://localhost:44352/api/proveedores/' + id,
        type: 'PUT',
        async: 'true',
        cache: 'false',
        data: JSON.stringify(modelView),
        crossDomain: true,
        contentType: 'application/json',
        beforeSend: function () {
            $(document).ready(function () {
                $('#loader').show();
            });
        },
        complete: function () {
            $('#loader').hide();
        },
        error: function (xhr, httpStatusMessage, customMessage) {
            if (xhr.status === 500) {
                $('#errorModalMsg').text(customMessage);
                $('#errorModal').modal('show');
                proveedoresReset();
                $('#loader').hide();
            }
        },
        success: function () {
            proveedoresPostSuccess();
            $('#proveedoresTabla').DataTable().ajax.reload();
            proveedoresReset();
            $('#loader').hide();
        }
    });
}

function proveedoresDELETE() {
    let id = $('#proveedoresId').val();

    $.ajax({
        url: 'https://localhost:44352/api/proveedores/' + id,
        type: 'DELETE',
        async: 'true',
        cache: 'false',
        crossDomain: true,
        contentType: 'application/json',
        beforeSend: function () {
            $(document).ready(function () {
                $('#loader').show();
            });
        },
        complete: function () {
            $('#loader').hide();
        },
        error: function (xhr, httpStatusMessage, customMessage) {
            if (xhr.status === 500) {
                $('#errorModalMsg').text(customMessage);
                $('#errorModal').modal('show');
                proveedoresReset();
                $('#loader').hide();
            }
        },
        success: function () {
            proveedoresPostSuccess();
            $('#proveedoresTabla').DataTable().ajax.reload();
            proveedoresReset();
            $('#loader').hide();
        }
    });
}

function proveedoresPostSuccess() {
    $('#proveedoresPostSuccess').show('fade');
    setTimeout(function () { $('#proveedoresPostSuccess').hide('fade'); }, 6000);
}

function proveedoresConfirm(data) {
    $('#proveedoresModal').modal('show');
    $('#proveedoresDeleteID').val(data);
}
function proveedoresModalDelete() {
    let id = $('#proveedoresDeleteID').val();
    $('#proveedoresId').val(id)
    proveedoresDELETE();
}

$('#proveedoresReset').click(function () {
    proveedoresReset();
});
function proveedoresReset() {
    $('#proveedoresProveedor').val('');
    $('#proveedoresMonto').val('');
    $('#proveedoresMoneda').val('');
    $('#proveedoresFecha').val('');
    $('#proveedoresComentario').val('');
    $('#proveedoresId').val('');
    $('#proveedoresGuardar').text('Guardar');
}