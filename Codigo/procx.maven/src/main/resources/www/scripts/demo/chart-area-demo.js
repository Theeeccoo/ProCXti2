// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

function redirect() {
    const SessionID = JSON.parse(window.localStorage.getItem("SessionID"));
    window.location.replace("http://127.0.0.1:5500/Codigo/procx.maven/src/main/resources/layout/perfil.html#" + SessionID);
}

function number_format(number, decimals, dec_point, thousands_sep) {
    // *     example: number_format(1234.56, 2, ',', ' ');
    // *     return: '1 234,56'
    number = (number + '').replace(',', '').replace(' ', '');
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function (n, prec) {
            var k = Math.pow(10, prec);
            return '' + Math.round(n * k) / k;
        };
    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
}
function limpar(n) {
    var ctx = document.getElementById("chart-area1");
    ctx.innerHTML = ''
    ctx.innerHTML = `<canvas id='myAreaChart${n}'></canvas>`

}

function validade() {
    const SessionID = JSON.parse(window.localStorage.getItem("SessionID"));
    //ativsFeitas = JSON.parse(window.localStorage.getItem(`atividadesRealizadas${SessionID}`));
    var urlAtiv = `http://localhost:5432/AllAtividades/${SessionID}`;

    // REQUISICAO ATIV
    $.ajax({
        dataType: "text",
        url: urlAtiv,
        type: "GET",
        data: null,
        header: { "Content-Type": "application/text" },
    }).done(function (data) {
        let ativs = JSON.parse(data);
        var ativsFeitas = ativs.filter(function (ele) {

            return ele.estado_Atividade == true;

        })
        let sel = document.getElementById("selectt")
        if (ativsFeitas == null || ativsFeitas.length < 7) {

            sel.innerHTML = '<option >Hoje</option>'
        } else if (ativsFeitas.length >= 7 && ativsFeitas.length < 30) {
            sel.innerHTML = '<option >Hoje</option><option >Ultimos 7 dias</option>'
        } else if (ativsFeitas.length >= 30 && ativsFeitas.length < 90) {
            sel.innerHTML = '<option >Hoje</option><option >Ultimos 7 dias</option><option >Ultimos 30 dias</option>'
        } else if (ativsFeitas.length >= 99) {
            sel.innerHTML = '<option >Hoje</option><option >Ultimos 7 dias</option><option >Ultimos 30 dias</option><option >Ultimos 90 dias</option>'
        }
    })
}
validade()
function handleDaysG(event) {
    const SessionID = JSON.parse(window.localStorage.getItem("SessionID"));
    // ativsFeitas = JSON.parse(window.localStorage.getItem(`atividadesRealizadas${SessionID}`));
    var urlAtiv = `http://localhost:5432/AllAtividades/${SessionID}`;

    // REQUISICAO ATIV
    $.ajax({
        dataType: "text",
        url: urlAtiv,
        type: "GET",
        data: null,
        header: { "Content-Type": "application/text" },
    }).done(function (data) {
        let ativs = JSON.parse(data);
        var ativsFeitas = ativs.filter(function (ele) {

            return ele.estado_Atividade == true;

        })

        let texto = document.getElementById("chart-area1")
        texto.innerHTML = "<h3 id='txt_naodisp'>Você não tem registros suficientes</h3>"


        let days = 7
        lab = ["Seg", 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom']
        var ctx = document.getElementById("myAreaChart1");


        if (event == undefined || event.target.value == 'Hoje') {

            limpar(4)
            days = 1
            if (ativs != null) {
                lab = ativs.map(atv => atv.horario)
            }
            ctx = document.getElementById("myAreaChart4");
        }
        else if (event.target.value == 'Ultimos 7 dias') {
            limpar(1)
            days = 7
            lab = ["Seg", 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom']
            ctx = document.getElementById("myAreaChart1");
        } else {
            const valor = event.target.value
            if (valor == 'Ultimos 30 dias') {
                limpar(2)


                ctx = document.getElementById("myAreaChart2");

                days = 30
                lab = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30',]
            } else if (valor == 'Ultimos 90 dias') {
                limpar(3)
                ctx = document.getElementById("myAreaChart3");
                days = 90
                lab = ["10", "20", "30", '40', '50', '60', '70', '80', '90']
            }
        }



        let newData = []
        if (ativsFeitas == null || days == 1) {
            let contt1 = 0
            let arrayy = ativs.map(atv => {
                if (atv.estado_Atividade == true) {
                    contt1++
                    porc = contt1 * 100 / ativs.length

                    return Number(porc.toFixed(2))
                } else {
                    porc = contt1 * 100 / ativs.length

                    return Number(porc.toFixed(2))
                }
            })
            newData = arrayy

        } else {

            for (i = ativsFeitas.length - 1; i > ativsFeitas.length - days - 1; i--) {
                let contTrues = 0

                ativsFeitas[i].ArrayAtividadesFeitas.map(atv => { if (atv == true) { contTrues++ } })

                porc = contTrues * 100 / ativsFeitas[i].ArrayAtividadesFeitas.length

                newData = [...newData, porc]


            }
        }
        if (days == 90) {

            let cont1 = 0
            let cont2 = 0
            let cont3 = 0
            let cont4 = 0
            let cont5 = 0
            let cont6 = 0
            let cont7 = 0
            let cont8 = 0
            let cont9 = 0
            for (let i = 0; i < 90; i++) {
                if (i < 10) {
                    cont1 += newData[i]
                } else if (i >= 10 && i < 20) { cont2 += newData[i] }
                else if (i >= 20 && i < 30) { cont3 += newData[i] }
                else if (i >= 30 && i < 40) { cont4 += newData[i] }
                else if (i >= 40 && i < 50) { cont5 += newData[i] }
                else if (i >= 50 && i < 60) { cont6 += newData[i] }
                else if (i >= 60 && i < 70) { cont7 += newData[i] }
                else if (i >= 70 && i < 80) { cont8 += newData[i] }
                else if (i >= 80 && i < 90) { cont9 += newData[i] }
            }

            let noventaData = [cont1 / 10, cont2 / 10, cont3 / 10, cont4 / 10, cont5 / 10, cont6 / 10, cont7 / 10, cont8 / 10, cont9 / 10]

            newData = noventaData
        }



        //["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",]
        // Area Chart Example
        var myLineChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: lab,
                datasets: [{
                    label: "Aproveitamento :",
                    lineTension: 0.3,
                    backgroundColor: "rgba(78, 115, 223, 0.05)",
                    borderColor: "rgba(78, 115, 223, 1)",
                    pointRadius: 3,
                    pointBackgroundColor: "rgba(78, 115, 223, 1)",
                    pointBorderColor: "rgba(78, 115, 223, 1)",
                    pointHoverRadius: 3,
                    pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
                    pointHoverBorderColor: "rgba(78, 115, 223, 1)",
                    pointHitRadius: 10,
                    pointBorderWidth: 2,
                    data: newData,
                }],
            },
            options: {
                maintainAspectRatio: false,
                layout: {
                    padding: {
                        left: 10,
                        right: 25,
                        top: 25,
                        bottom: 0
                    }
                },
                scales: {
                    xAxes: [{
                        time: {
                            unit: 'date'
                        },
                        gridLines: {
                            display: false,
                            drawBorder: true
                        },
                        ticks: {
                            maxTicksLimit: 10
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            maxTicksLimit: 6,

                            padding: 10,
                            // Include a dollar sign in the ticks
                            callback: function (value, index, values) {
                                return number_format(value) + '%';
                            }
                        },
                        gridLines: {
                            color: "rgb(234, 236, 244)",
                            zeroLineColor: "rgb(234, 236, 244)",
                            drawBorder: false,
                            borderDash: [2],
                            zeroLineBorderDash: [2]
                        }
                    }],
                },
                legend: {
                    display: false
                },
                tooltips: {
                    backgroundColor: "rgb(255,255,255)",
                    bodyFontColor: "#858796",
                    titleMarginBottom: 10,
                    titleFontColor: '#6e707e',
                    titleFontSize: 14,
                    borderColor: '#dddfeb',
                    borderWidth: 1,
                    xPadding: 15,
                    yPadding: 15,
                    displayColors: false,
                    intersect: false,
                    mode: 'index',
                    caretPadding: 10,
                    callbacks: {
                        label: function (tooltipItem, chart) {
                            var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
                            return datasetLabel + number_format(tooltipItem.yLabel) + '%';
                        }
                    }
                }
            }
        });
    }).fail(function(error){

        console.log(error);
    })
}


handleDaysG()
