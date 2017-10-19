/*
1. En la sección Centros, Investigadores y Laboratorios vemos potencial en el
posicionamiento de las pelotas. Ofrecer información a través de la posición y la cercanía de las pelotas
entre sí. Las burbujas podrían aparecer de una vez organizados por Región, por ejemplo.

4. Cambiar la configuración espacial de la sección Centros, Investigadores y Laboratorios de manera
que el proceso se haga autoexplicativo y se aumente la usabilidad e interpretabilidad de resultados
de búsqueda. Por ejemplo, que el orden de la interfaz vaya de izquierda a derecha
Selecciona/Pelotas/Descripción.
*/

// 3. También poder hacer click en las regiones, y que solo permanezcan las pelotas de la región clickeada (considerar incluso que al hacer click en alguna categoría del menú desplegable, desaparezcan de la lista las regiones sin pelotas): DONE!!!!
// 2. Sería útil poder hacer click en los correos electrónicos provistos: DONE!!!!
// 5. Hacer que los links clickeables se abran en nuevas pestañas, no en la misma web PIA+S: DONE!!!!

function drawChart(data) {

  var width = window.innerWidth;
	var height = window.innerHeight;

  var regiones = ['Tarapaca','Antofagasta','Coquimbo','Valparaiso','Santiago','Maule','Bio-Bio','Araucania','Los Rios']

  var n = 68, // total number of nodes
      m = regiones.length; // number of distinct clusters

  var hover = function(d) {
    return "<b>Region:</b> " + d.region + "<br/>" +
            "<b>Entidad:</b> " + d.entidad + "<br/>" +
            "<b>Grupo de Investigacion:</b> " + d.grupo + "<br/>";
  };

  var tool_tip = d3.tip()
      .attr("class", "d3-tip")
      .offset([-3, 0])
      .html(hover);

  var svg = d3.select('#bubbles')
    .append('svg')
    .attr('class', 'bubls')
    .attr("width", '100%')
    .attr("height", '100%')
    .attr('viewBox','0 0 ' + Math.min(width) + ' ' + Math.min(height))
    .attr("preserveAspectRatio", "xMinYMin meet")
    // .call(d3.zoom().on("zoom", function () { svg.attr("'rgba(113,214,231,0.8)'form", d3.event.'rgba(113,214,231,0.8)'form) }))
    .append('g')
    .attr('transform', 'translate(0,0)');

  svg.call(tool_tip);

  // Settings
  var radiusCollide = 25;
  var strengthValue = 0.06;
  var alpha = 0.23;
  var pallete = ["#ffc60c", "#cc5810", "#558930", "#1f86cc", "#7f3e98", "#717770", "#ffc60c", "#71d6e7", "#f3800d"];
  var color = d3.scaleOrdinal(pallete);
  var filling = function(d) { return color(d.region) };
  var colorOn = 'rgba(243,128,13,0.8)';
  var colorOff = 'rgba(113,214,231,0.8)';
  var colorStroke = 'rgba(218,218,217,0.7)';
  var colorTarapaca = pallete[0]
  var colorAntofagasta = pallete[1]
  var colorCoquimbo = pallete[2]
  var colorValparaiso = pallete[3]
  var colorSantiago = pallete[4]
  var colorMaule = pallete[5]
  var colorBioBio = pallete[6]
  var colorAraucania = pallete[7]
  var colorLosRios = pallete[8]

  var forceX = d3.forceX(function() { return width / 2 }).strength(strengthValue).x(width * .5)
  var forceY = d3.forceY(function() { return height / 2 }).strength(strengthValue).y(height * .5)
  var colliding = d3.forceCollide(function() { return radiusCollide * 1.2})

  var simulation = d3.forceSimulation()
    .velocityDecay(0.5)
    .force('x', forceX)
    .force('y', forceY)
    .force("center", d3.forceCenter(width / 2, height / 2))
    .force('collide', colliding);

  // Starting simulation
  simulation.nodes(data).on('tick', ticked);

  var ypos = 70;
  var sep = 1.1;

  function ticked() {
    circles
      .attr('cx', function(d) { return d.x })
      .attr('cy', function(d) { return d.y })
      // .attr('cy', function(d) {
      //   if (d.region == regiones[0]) { return ypos*sep; }
      //   if (d.region == regiones[1]) { return ypos*(sep*2); }
      //   if (d.region == regiones[2]) { return ypos*(sep*3); }
      //   if (d.region == regiones[3]) { return ypos*(sep*4); }
      //   if (d.region == regiones[4]) { return ypos*(sep*5); }
      //   if (d.region == regiones[5]) { return ypos*(sep*6); }
      //   if (d.region == regiones[6]) { return ypos*(sep*7); }
      //   if (d.region == regiones[7]) { return ypos*(sep*8); }
      //   if (d.region == regiones[8]) { return ypos*(sep*9); }
      // })
  }

  var hide = function(d) {d3.select("#hidden").html('<h4>'+d.grupo+'</h2>' + '<br/>'
                                + '</h4>Entidad: ' + d.entidad + '</h4>'  + '<br/>'
                                + '<b> Investigador Responsable:</b> ' + d.inv_responsable + '<br/>'
                                + "<b>Correo Investigador: </b><a href='mailto:" + d.mail_inv_responsable + "'>" + d.mail_inv_responsable + "</a>" + "<br/>"
                                + '<b>Telefono:</b> ' + d.telefono_entidad + '<br/>'
                                + '<b>Web:</b> ' + '<a href="' + d.web_entidad + '" target="_blank">' + d.web_entidad + '</a>' + '<br/>'
                                + '<b>Linea de Investigacion:</b> ' + d.linea_investigacion_gi)}

  // Circles or Nodes - Potato, Potato...
  var circles = svg.selectAll('.gi')
    .data(data)
    .enter()
    .append('circle')
    .attr('class', 'gi')
    .attr('r', radiusCollide)
    .attr("fill", filling)
    .attr('stroke', function(d) { return colorStroke })
    .attr("id", function(d) { return d.id_gi })
    .on('click', hide)
    .on('mouseover', tool_tip.show)
    .on('mouseout', tool_tip.hide);

  ////////////// Buttons TEMATICAS
  //////////////////////////////////////////

  d3.select('#all').on('click', function() {
    simulation
      .velocityDecay(0.5)
      .force('x', forceX)
      .force('y', forceY)
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force('collide', colliding)
      .restart();
    circles
      .attr("fill", colorOff)
      .attr('stroke', colorStroke )
      .attr('r', radiusCollide)
      .on('click',hide);
  })

  ///// Quantitative Categories //////////////////////////////////////////
  // Functions Settings
  var colSep = 3;
  var collideButton = function(d) { return d.labs + radiusCollide*colSep };

  function buttonsQuan(id) {
    d3.select(id).on('click', function() {
      simulation
        .force('collide',collideButton)
        .alphaTarget(0)
        .restart();
      circles
        .attr("r", function(d) {
          if (id=='#lab') { return d.labs };
          if (id=='#serv') { return d.services * 3};
          if (id=='#prog') { return d.programmes * 5.5};
          if (id=='#proj') { return d.projects * 2.3};
          if (id=='#publ') { return d.publications * 0.8};
          if (id=='#rese') { return d.researchers * 3.3};
          if (id=='#netn') { return d.netnacional * 3};
          if (id=='#nete') { return d.netinternacional * 2.5};
        })
        .attr("fill",filling)
        .on('click',hide);
    })
  }

  buttonsQuan('#lab')
  buttonsQuan('#serv')
  buttonsQuan('#prog')
  buttonsQuan('#proj')
  buttonsQuan('#publ')
  buttonsQuan('#rese')
  buttonsQuan('#netn')
  buttonsQuan('#nete')

  ///// Geographical Categories //////////////////////////////////////////
  // Functions Settings
  function buttonsGeo(id) {
    if(id=='#tarapaca') {
      d3.select(id).on('mouseover', function() {
        circles
          .attr("fill",function(d) { if (d.region == 'Tarapaca') { return colorOn } else { return colorOff } })
          .attr("stroke",function(d) { if (d.region == 'Tarapaca') { return colorStroke }})
          .on('click',hide);
      }).show
      d3.select(id).on('mouseover', function() {
        circles
          .attr("fill",function(d) { if (d.region == 'Tarapaca') { return colorOn } else { return colorOff } })
          .attr("stroke",function(d) { if (d.region == 'Tarapaca') { return colorStroke }})
          .on('click',hide);
      }).hide
    }
    if(id=='#antofagasta') {
      d3.select(id).on('mouseover', function() {
        circles
          .attr("fill",function(d) { if (d.region == 'Antofagasta') { return colorOn } else { return colorOff } })
          .attr("stroke",function(d) { if (d.region == 'Antofagasta') { return colorStroke }})
          .on('click',hide);
      }).show
      d3.select(id).on('mouseover', function() {
        circles
          .attr("fill",function(d) { if (d.region == 'Antofagasta') { return colorOn } else { return colorOff } })
          .attr("stroke",function(d) { if (d.region == 'Antofagasta') { return colorStroke }})
          .on('click',hide);
      }).hide
    }
    if(id=='#coquimbo') {
      d3.select(id).on('mouseover', function() {
        circles
          .attr("fill",function(d) { if (d.region == 'Coquimbo') { return colorOn } else { return colorOff } })
          .attr("stroke",function(d) { if (d.region == 'Coquimbo') { return colorStroke }})
          .on('click',hide);
      }).show
      d3.select(id).on('mouseover', function() {
        circles
          .attr("fill",function(d) { if (d.region == 'Coquimbo') { return colorOn } else { return colorOff } })
          .attr("stroke",function(d) { if (d.region == 'Coquimbo') { return colorStroke }})
          .on('click',hide);
      }).hide
    }
    if(id=='#valparaiso') {
      d3.select(id).on('mouseover', function() {
        circles
          .attr("fill",function(d) { if (d.region == 'Valparaiso') { return colorOn } else { return colorOff } })
          .attr("stroke",function(d) { if (d.region == 'Valparaiso') { return colorStroke }})
          .on('click',hide);
      }).show
      d3.select(id).on('mouseover', function() {
        circles
          .attr("fill",function(d) { if (d.region == 'Valparaiso') { return colorOn } else { return colorOff } })
          .attr("stroke",function(d) { if (d.region == 'Valparaiso') { return colorStroke }})
          .on('click',hide);
      }).hide
    }
    if(id=='#santiago') {
      d3.select(id).on('mouseover', function() {
        circles
          .attr("fill",function(d) { if (d.region == 'Santiago') { return colorOn } else { return  colorOff } })
          .attr("stroke",function(d) { if (d.region == 'Santiago') { return colorStroke }})
          .on('click',hide);
      }).show
      d3.select(id).on('mouseover', function() {
        circles
          .attr("fill",function(d) { if (d.region == 'Santiago') { return colorOn } else { return colorOff } })
          .attr("stroke",function(d) { if (d.region == 'Santiago') { return colorStroke }})
          .on('click',hide);
      }).hide
    }
    if(id=='#maule') {
      d3.select(id).on('mouseover', function() {
        circles
          .attr("fill",function(d) { if (d.region == 'Maule') { return colorOn } else { return colorOff } })
          .attr("stroke",function(d) { if (d.region == 'Maule') { return colorStroke }})
          .on('click',hide);
      }).show
      d3.select(id).on('mouseover', function() {
        circles
          .attr("fill",function(d) { if (d.region == 'Maule') { return colorOn } else { return colorOff } })
          .attr("stroke",function(d) { if (d.region == 'Maule') { return colorStroke }})
          .on('click',hide);
      }).hide
    }
    if(id=='#biobio') {
      d3.select(id).on('mouseover', function() {
        circles
          .attr("fill",function(d) { if (d.region == 'Bio-Bio') { return colorOn} else { return colorOff } })
          .attr("stroke",function(d) { if (d.region == 'Bio-Bio') { return colorStroke }})
          .on('click',hide);
      }).show
      d3.select(id).on('mouseover', function() {
        circles
          .attr("fill",function(d) { if (d.region == 'Bio-Bio') { return colorOn } else { return colorOff } })
          .attr("stroke",function(d) { if (d.region == 'Bio-Bio') { return colorStroke }})
          .on('click',hide);
      }).hide
    }
    if(id=='#araucania') {
      d3.select(id).on('mouseover', function() {
        circles
          .attr("fill",function(d) { if (d.region == 'Araucania') { return colorOn } else { return colorOff } })
          .attr("stroke",function(d) { if (d.region == 'Araucania') { return colorStroke }})
          .on('click',hide);
      }).show
      d3.select(id).on('mouseover', function() {
        circles
          .attr("fill",function(d) { if (d.region == 'Araucania') { return colorOn } else { return colorOff } })
          .attr("stroke",function(d) { if (d.region == 'Araucania') { return colorStroke }})
          .on('click',hide);
      }).hide
    }
    if(id=='#losrios') {
      d3.select(id).on('mouseover', function() {
        circles
          .attr("fill",function(d) { if (d.region == 'Los Rios') { return colorOn } else { return colorOff } })
          .attr("stroke",function(d) { if (d.region == 'Los Rios') { return colorStroke }})
          .on('click',hide);
      }).show
      d3.select(id).on('mouseout', function() {
        circles
          .attr("fill",function(d) { if (d.region == 'Los Rios') { return colorOn } else { return colorOff } })
          .attr("stroke",function(d) { if (d.region == 'Los Rios') { return colorStroke }})
          .on('click',hide);
      }).hide
    }
  }

  buttonsGeo('#tarapaca')
  buttonsGeo('#antofagasta')
  buttonsGeo('#coquimbo')
  buttonsGeo('#valparaiso')
  buttonsGeo('#santiago')
  buttonsGeo('#maule')
  buttonsGeo('#biobio')
  buttonsGeo('#araucania')
  buttonsGeo('#losrios')

  ///// Legend ///////////////////////////////////////////////////
  // var legendRectSize = 20;
  // var legendSpacing = 2;
  //
  // var legend = svg.selectAll('.legend')
  //   .data(color.domain())
  //   .enter()
  //   .append('g')
  //   .attr('class', 'legend')
  //   .attr(''rgba(113,214,231,0.8)'form', function(d, i) {
  //     var height = legendRectSize + legendSpacing;
  //     var offset =  height * color.domain().length / 150;
  //     var offset =  height / 2;
  //     var horz = legendRectSize;
  //     var vert = i * height - offset;
  //     return ''rgba(113,214,231,0.8)'late(' + horz + ',' + vert + ')';
  //   });
  //
  // legend.append('rect')
  //   .attr('width', legendRectSize - 5)
  //   .attr('height', legendRectSize - 10)
  //   .style('fill', color)
  //   .style('stroke', color);
  //
  // legend.append('text')
  //   .attr('x', legendRectSize + legendSpacing)
  //   .attr('y', legendRectSize/2)
  //   .text(function(d) { return d; });



}; ////////////////////////////////// D3 - END //////////////////////////////////
////////////////////////////////// Tabletop //////////////////////////////////
var pias = '14CoOreiOQwZxBk8L-j-THHp9qxRC4MkSizW9wboxYOo'
var options = { key: pias, simpleSheet: true, callback: draw }
function renderSpreadsheetData() { Tabletop.init(options) }
function draw(data, tabletop) { drawChart(data) }
renderSpreadsheetData();
////////////////////////////////// Tabletop - END//////////////////////////////////
