using System;
using System.Collections.Generic;

namespace api.Models
{
    public partial class Proveedores
    {
        public int IdProveedor { get; set; }
        public string Proveedor { get; set; }
        public decimal? Monto { get; set; }
        public string Moneda { get; set; }
        public DateTime? Fecha { get; set; }
        public string Comentario { get; set; }
    }
}
