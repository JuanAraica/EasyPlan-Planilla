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
    public class PrestamosController : Controller
    {
        private easyplanEntities db = new easyplanEntities();

        // GET: Prestamos
        public ActionResult Index()
        {
            var tbl_Prestamos = db.Tbl_Prestamos.Include(t => t.Tbl_Trabajador);
            return View(tbl_Prestamos.ToList());
        }

        // GET: Prestamos/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Tbl_Prestamos tbl_Prestamos = db.Tbl_Prestamos.Find(id);
            if (tbl_Prestamos == null)
            {
                return HttpNotFound();
            }
            return View(tbl_Prestamos);
        }

        // GET: Prestamos/Create
        public ActionResult Create()
        {
            ViewBag.CedulaTra = new SelectList(db.Tbl_Trabajador, "CedulaTra", "Nombre");
            return View();
        }

        // POST: Prestamos/Create
        // Para protegerse de ataques de publicación excesiva, habilite las propiedades específicas a las que quiere enlazarse. Para obtener 
        // más detalles, vea https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "idPrestamo,CedulaTra,Monto,FechaPrestamo,EmisorPrestamo")] Tbl_Prestamos tbl_Prestamos)
        {
            if (ModelState.IsValid)
            {
                db.Tbl_Prestamos.Add(tbl_Prestamos);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.CedulaTra = new SelectList(db.Tbl_Trabajador, "CedulaTra", "Nombre", tbl_Prestamos.CedulaTra);
            return View(tbl_Prestamos);
        }

        // GET: Prestamos/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Tbl_Prestamos tbl_Prestamos = db.Tbl_Prestamos.Find(id);
            if (tbl_Prestamos == null)
            {
                return HttpNotFound();
            }
            ViewBag.CedulaTra = new SelectList(db.Tbl_Trabajador, "CedulaTra", "Nombre", tbl_Prestamos.CedulaTra);
            return View(tbl_Prestamos);
        }

        // POST: Prestamos/Edit/5
        // Para protegerse de ataques de publicación excesiva, habilite las propiedades específicas a las que quiere enlazarse. Para obtener 
        // más detalles, vea https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "idPrestamo,CedulaTra,Monto,FechaPrestamo,EmisorPrestamo")] Tbl_Prestamos tbl_Prestamos)
        {
            if (ModelState.IsValid)
            {
                db.Entry(tbl_Prestamos).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.CedulaTra = new SelectList(db.Tbl_Trabajador, "CedulaTra", "Nombre", tbl_Prestamos.CedulaTra);
            return View(tbl_Prestamos);
        }

        // GET: Prestamos/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Tbl_Prestamos tbl_Prestamos = db.Tbl_Prestamos.Find(id);
            if (tbl_Prestamos == null)
            {
                return HttpNotFound();
            }
            return View(tbl_Prestamos);
        }

        // POST: Prestamos/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Tbl_Prestamos tbl_Prestamos = db.Tbl_Prestamos.Find(id);
            db.Tbl_Prestamos.Remove(tbl_Prestamos);
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
