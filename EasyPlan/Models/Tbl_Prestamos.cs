//------------------------------------------------------------------------------
// <auto-generated>
//     Este código se generó a partir de una plantilla.
//
//     Los cambios manuales en este archivo pueden causar un comportamiento inesperado de la aplicación.
//     Los cambios manuales en este archivo se sobrescribirán si se regenera el código.
// </auto-generated>
//------------------------------------------------------------------------------

namespace EasyPlan.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Tbl_Prestamos
    {
        public int idPrestamo { get; set; }
        public string CedulaTra { get; set; }
        public int Monto { get; set; }
        public string FechaPrestamo { get; set; }
        public string EmisorPrestamo { get; set; }
    
        public virtual Tbl_Trabajador Tbl_Trabajador { get; set; }
    }
}
