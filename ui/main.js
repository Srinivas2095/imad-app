var button=document.getElementById('counter');
button.onclick=function()
{
  var request=new XMLHttpRequest();
  request.onreadystatechange=function()
  {
      if(request.readyState==XMLHttpRequest.DONE)
      {
          if(request.status===200)
          {
              var counter=request.responseText;
              var span=document.getElementById('count');
              span.innerHTML=counter.toString();
          }
      }
  };
  request.open('GET','http://srinivasavaradhansriram.imad.hasura-app.io/counter',true);
  request.send(null);
};


var inputName=document.getElementById('name');
var name1=inputName.value;
var submit=document.getElementById('btn_submit');
submit.onclick(function()
{
    var names=['names1','names2','names3'];
    var list='';
    for(var i=0;i<names.length;i++)
    {
        list="<li>"+ names[i]+"</li>";
    }
    var ul=document.getElementById('listName');
    ul.innerHTML=list;
})
