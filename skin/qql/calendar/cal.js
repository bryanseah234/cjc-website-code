function goDate(dstr) {
  window.open(furl+'&?focus='+dstr,'_top');
}

$(function(){
  $("table.cal_navi INPUT.small").click(function(){
    goDate($(this).attr("alt"));    
  });
  $("table.cal_navi SELECT.small").change(function(){
    goDate($("#sel_year").val()+'-'+$("#sel_month").val());    
  });  
});