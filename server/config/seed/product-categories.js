'use strict';

var list = [
    { name: 'Arroz', image: 'http://rackcdn.recetasparaadelgazar.com/wp-content/uploads/2015/06/arroz011.jpg' },
    { name: 'Garbanzos', image: 'http://static.hogarmania.com/archivos/201204/garbanzos-regular-colesterol-xl-668x400x80xX.jpg' },
    { name: 'Condimentos', image: 'https://igdigital.com/wp-content/uploads/2015/05/especias-y-condimentos.jpg' },
    { name: 'Aderezos', image: 'http://www.misanplas.com.ar/wp-content/uploads/2013/04/aderezo-456x250.jpg' },
    { name: 'Salsas', image: 'http://mejorconsalud.com/wp-content/uploads/2015/07/salsas-para-ensaladas-500x334.jpg' },
    { name: 'Azúcar', image: 'http://cfxtras.com/wp-content/uploads/2016/03/el-azucar-produce-reflujo-gastrico-descubre-que-es-bueno-para-la-acidez.jpg' },
    { name: 'Golosinas', image: 'https://vivirmasvivirmejor.files.wordpress.com/2014/11/tumblr_static_candy_largewide.jpg' },
    { name: 'Harina', image: 'http://buenavibra.es/wp-content/uploads/2015/10/harina.jpg' },
    { name: 'Huevos', image: 'http://eldiariodelasalud.com/wp-content/uploads/2015/10/huevos.jpg' },
    { name: 'Puré', image: 'http://www.dosanclas.com.ar/wp-content/files_mf/recetacaseradepur%C3%A9depapa11.jpg' },
    { name: 'Postres', image: 'http://postresrapidos.net/wp-content/uploads/2014/06/consejos-para-preparar-postres.jpg' },
    { name: 'Sopas', image: 'http://cde.3.elcomercio.pe/ima/0/1/1/7/7/1177815/558x367.jpg' },
    { name: 'Caldos', image: 'http://caldoecia.com.br/wp-content/uploads/2011/05/caldos1-1020x400.jpg' }
];

exports.list = list.map(function(category, index) {
    category._id = index;
    return category;
});
