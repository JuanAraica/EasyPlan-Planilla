using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using EasyPlan.Models;

namespace EasyPlan.Controllers
{
    public class JornadaController : Controller
    {
        private easyplanEntities db = new easyplanEntities();

        // GET: Jornada
        public ActionResult Index()
        {
            var tbl_Jornada = db.Tbl_Jornada.Include(t => t.Tbl_Trabajador);
            return View(tbl_Jornada.ToList());
        }

        // GET: Jornada/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Tbl_Jornada tbl_Jornada = db.Tbl_Jornada.Find(id);
            if (tbl_Jornada == null)
            {
                return HttpNotFound();
            }
            return View(tbl_Jornada);
        }

        // GET: Jornada/Create
        public ActionResult Create()
        {
            ViewBag.CedulaTra = new SelectList(db.Tbl_Trabajador, "CedulaTra", "Nombre");
            return View();
        }

        // POST: Jornada/Create
        // Para protegerse de ataques de publicación excesiva, habilite las propiedades específicas a las que quiere enlazarse. Para obtener 
        // más detalles, vea https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "idJornada,CedulaTra,TipoJornada,HoraInicio,HoraFin,PrecioHoraRegular,PrecioHoraExtra,CantidadHorasRegulares,CantidadHorasExtras,ValorTotalHoraExtra,ValorTotalHorasRegulares,PrecioDia,UnidadMedida,PrecioUnidadMedida,ValorTotalUnidadMedida,PrecioMetro,PrecioPaquete,LaborExtra,PrecioLaborExtra,FechaJornada,SalarioJornada,Observacion")] Tbl_Jornada tbl_Jornada)
        {
            if (ModelState.IsValid)
            {
                db.Tbl_Jornada.Add(tbl_Jornada);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.CedulaTra = new SelectList(db.Tbl_Trabajador, "CedulaTra", "Nombre", tbl_Jornada.CedulaTra);
            return View(tbl_Jornada);
        }

        // GET: Jornada/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Tbl_Jornada tbl_Jornada = db.Tbl_Jornada.Find(id);
            if (tbl_Jornada == null)
            {
                return HttpNotFound();
            }
            ViewBag.CedulaTra = new SelectList(db.Tbl_Trabajador, "CedulaTra", "Nombre", tbl_Jornada.CedulaTra);
            return View(tbl_Jornada);
        }

        // POST: Jornada/Edit/5
        // Para protegerse de ataques de publicación excesiva, habilite las propiedades específicas a las que quiere enlazarse. Para obtener 
        // más detalles, vea https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "idJornada,CedulaTra,TipoJornada,HoraInicio,HoraFin,PrecioHoraRegular,PrecioHoraExtra,CantidadHorasRegulares,CantidadHorasExtras,ValorTotalHoraExtra,ValorTotalHorasRegulares,PrecioDia,UnidadMedida,PrecioUnidadMedida,ValorTotalUnidadMedida,PrecioMetro,PrecioPaquete,LaborExtra,PrecioLaborExtra,FechaJornada,SalarioJornada,Observacion")] Tbl_Jornada tbl_Jornada)
        {
            if (ModelState.IsValid)
            {
                db.Entry(tbl_Jornada).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.CedulaTra = new SelectList(db.Tbl_Trabajador, "CedulaTra", "Nombre", tbl_Jornada.CedulaTra);
            return View(tbl_Jornada);
        }

        // GET: Jornada/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Tbl_Jornada tbl_Jornada = db.Tbl_Jornada.Find(id);
            if (tbl_Jornada == null)
            {
                return HttpNotFound();
            }
            return View(tbl_Jornada);
        }

        // POST: Jornada/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Tbl_Jornada tbl_Jornada = db.Tbl_Jornada.Find(id);
            db.Tbl_Jornada.Remove(tbl_Jornada);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
