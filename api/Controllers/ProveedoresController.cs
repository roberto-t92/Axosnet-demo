using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api.Models;
using System.Web.Http.Cors;
using Newtonsoft.Json.Linq;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProveedoresController : ControllerBase
    {
        private readonly AxosNetContext context;

        public ProveedoresController(AxosNetContext _context)
        {
            context = _context;
        }

        [HttpGet]
        public JsonResult Get()
        {
            return new JsonResult(new { data = context.Proveedores.ToList() });
        }

        [HttpPost]
        public IActionResult Post([FromBody] Proveedores proveedores) 
        {
            try
            {
                if (ModelState.IsValid)
                {
                    context.Proveedores.Add(proveedores);
                    context.SaveChanges();
                    return StatusCode(201);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
            return BadRequest(ModelState);
        }

        [HttpPut("{id}")]
        public IActionResult Put([FromBody] Proveedores proveedores, int id)
        {
            try
            {
                if (proveedores.IdProveedor != id)
                {
                    return BadRequest();
                }
                var table = context.Proveedores.First(row => row.IdProveedor == id);

                if (!String.IsNullOrEmpty(proveedores.Proveedor))
                    table.Proveedor = proveedores.Proveedor;
                if (!String.IsNullOrEmpty(Convert.ToString(proveedores.Monto)))
                    table.Monto = proveedores.Monto;
                if (!String.IsNullOrEmpty(proveedores.Moneda))
                    table.Moneda = proveedores.Moneda;
                if (!String.IsNullOrEmpty(proveedores.Comentario))
                    table.Comentario = proveedores.Comentario;

               context.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                context.Remove(context.Proveedores.Single(row => row.IdProveedor == id));
                context.SaveChanges();
                return StatusCode(204);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
