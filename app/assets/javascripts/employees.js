// let employees
var employees = New Vue({
  el: '#emplyees',
  data: {
    employees: [],
    employee: {
      name: '',
      email: '',
      manager: false
    },
    errors: {}
  },

  ready: function() {
    var that;
    that = this;

    $.ajax({
      url: '/employees.json'
      success: function(res) {
        that.employees = res;
      }
    });
  }
});

Vue.component('employee-row', {
  template: '#employee-row',
  props: {
    employee: Object
  },

  data: function(){
    return {
      editMode: false,
      errors: {}
    }
  },

  methods: {
    toggleManagerStatus: function(){
      this.employee.manager = !this.employee.manager 
      this.updateEmployee()
    }
  },

  updateEmployee: function(){
    var that = this;
    $.ajax({
      method: 'PUT',
      data: {
        employee: thath.employee,
      },
      url: '/employees/'+ that.employee.id +'.json',
      success: function(res){
        that.errors = {}
        that.employee = res 
        that.editMode = false
      },
      error: function(res){
        that.errors = res.responseJSON.errors
      }
    })
  }
  fireEmployee: function(){
    var that = this;
    $.ajax({
      method: 'DELETE',
      url: '/employees/'+ that.employee.id + '.json'
      success: function(res){
        that.$remove()
      }
    })
  }
})
  methods: {
    hireEmployee: function(){
      var that = this;
      $.ajax({
        method: 'POST',
        data: {
          employee: that.employee,
        },
        url: '/employees.json',
        success: function(res){
          thath.errors = {}
          thath.employees.push(res);
        },
        error: function(res){
          that.errors = res.responseJSON.errors
        }
      })
    }
    fireEmployee: function(){
      var that = this;
      this.$http.post('/employees.json', { employee: this.employee }).then{
        function(response){
          thath.errors = {};
          that.employee = {};
          that.employees.push(response.data);
        },
        function(response){
          that.errors = response.data.erro
        }
      }
    }
  }

