var id='';
Vue.component('listado', {
  props: ['todo'],
  template: '<li v-on:click="cargarClikMaestro(todo.id)">{{ todo.nombre }}</li>',
  methods:{
    cargarClikMaestro: function(refer){
      $.ajax({
        //Curso
        url : 'http://10.60.23.20:49581/api/Personas/',   
        //Tabajo
        //url : 'http://10.60.9.127:49581/api/Personas/',
        data : { Id : refer },     
        type : 'GET',     
        dataType : 'json',     
        success : function(data) {
          //alert('YUPII');
          //debugger;
          formulario.rellenarDatosClick(data);
        },
        error : function(){
          debugger;
        },                
        complete : function(xhr, status) {
            alert('Petición realizada');
        }
    });
    }
  }
});


var maestro = new Vue({
  el: '#appMaestro',
  data: {
    items: [
      //{ id: 0, nombre: 'Alejandro', apellidos: 'Gutierrez', edad: 46 },
      //{ id: 1, nombre: 'Juan', apellidos: 'Garcia', edad: 32 },
      //{ id: 2, nombre: 'Pedro', apellidos: 'Ruiz', edad: 9 }
    ]
  },
  mounted: function(){
    this.cargalistado();
  },
  methods: {
    cargalistado: function(){
      //Cargar datos del listado
      $.ajax({
          // la URL para la petición
          //Curso
          url : 'http://10.60.23.20:49581/api/Personas/',   
          //Trabajo  
          //url : 'http://10.60.9.127:49581/api/Personas/',
          type : 'GET',     
          dataType : 'json',     
          success : function(data) {
            maestro.items = [];//Dejamos sin datos la vista para actualizarla de nuevo
            //maestro.items.length=0;//Dejamos sin datos la vista para actualizarla de nuevo
            for (var i = 0; i < data.length; i++) {
              var persona = {};
              persona.id = data[i].Id;
              persona.nombre = data[i].Nombre;
              persona.apellidos = data[i].Apellidos;
              persona.edad = data[i].Edad;
              //alert(data.Nombre)
              maestro.items.push(persona);
            }              
          },
          //Si hay error
          error : function(){
            debugger;
          },        
          // código a ejecutar sin importar si la petición falló o no
          complete : function(xhr, status) {
              alert('Petición realizada');
          }
      });
    }
  }
});


var formulario = new Vue({
  el: '#appFormulario',
  data: {
    visible: false,
    persona:{id: '', nombre: '', apellidos: '', edad: '' }
  },
  methods: {
    visibleBorrado: function() {
        this.visible = true;
        //var modi = document.getElementById(buttonModificar);
        //modi.disabled = true;
        //document.Formulario.Borrar.disabled=true;
        this.persona.id = '';
        this.persona.nombre = '';
        this.persona.apellidos = '';
        this.persona.edad = '';

    },
    onSubmit: function(event){
      var nombre1 = this.persona.nombre;
      var apellidos1 = this.persona.apellidos;
      var edad1 = this.persona.edad;
      //alert(nombre1+' '+apellidos1);
      $.ajax({
        // la URL para la petición
        //Curso
        url : 'http://10.60.23.20:49581/api/Personas/',     
        //Trabajo
        //url : 'http://10.60.9.127:49581/api/Personas/',
        type : 'POST',     
        dataType : 'json',
        data: { Nombre : nombre1, Apellidos: apellidos1, Edad: edad1 },
        success : function(data) {            
            alert('Correcto');
            //debugger;
        },
        //Si hay error
        error : function(){
          debugger;
        },        
        // código a ejecutar sin importar si la petición falló o no
        complete : function(xhr, status) {
            alert('Petición realizada');
            maestro.cargalistado();
        }
      });
    },
    rellenarDatosClick: function(data) {
        this.visible = true;
        this.persona.id = data.Id;
        this.persona.nombre = data.Nombre;
        this.persona.apellidos = data.Apellidos;
        this.persona.edad = data.Edad;
    },
    borrarPersona: function(){
      alert('borrando...');
        
    }
  }
});

