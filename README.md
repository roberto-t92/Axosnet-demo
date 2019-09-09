# Axosnet-demo
web api + mvc app demo que elabora operaciones basicas

Tech:<br/>
• ASP.NET MVC Core 2.2<br/>
• ASP.NET Web API Core 2.2<br/>
• Entity Framework Core 2.2<br/>
• Razor 2.2<br/>
• Newtonsoft.Json 12<br/>
• JQuery 3.4<br/>
• Bootstrap 4.3<br/>
• Moment.js 2.2<br/>
• DataTables.js 1.1<br/>

• Puertos en uso IIS Express: 44352 para api y 44359 para client<br/>

# Build
• Doble click en .sln<br/>
• Configurar startup de ambos proyectos en .sln > Properties > Common Properties > Startup Project > Multiple Startup Projects > Action y Start en ambos

# ConnectionString

• Cambiar el nombre de la instancia de SQL Server local en los archivos appsettings.json donde indica SQL_INSTANCE

# Generar base de datos 

• Abrir consola de Package Manager<br/>
1) Seleccionar default project: 'api' y ejecutar<br/>
```
PM> Add-Migration Init

PM> Update-Database
```
2) Seleccionar default project: 'client' y ejecutar<br/>
```
PM> Add-Migration Init

PM> Update-Database
```


