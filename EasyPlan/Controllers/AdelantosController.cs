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
    public class AdelantosController : Controller
    {
        private easyplanEntities db = new easyplanEntities();

        // GET: Adelantos
        public ActionResult Index()
        {
            var tbl_Adelantos = db.Tbl_Adelantos.Include(t => t.Tbl_Trabajador);
            return View(tbl_Adelantos.ToList());
        }

        // GET: Adelantos/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Tbl_Adelantos tbl_Adelantos = db.Tbl_Adelantos.Find(id);
            if (tbl_Adelantos == null)
            {
                return HttpNotFound();
            }
            return View(tbl_Adelantos);
        }

        // GET: Adelantos/Create
        public ActionResult Create()
        {
            ViewBag.CedulaTra = new SelectList(db.Tbl_Trabajador, "CedulaTra", "Nombre");
            return View();
        }

        // POST: Adelantos/Create
        // Para protegerse de ataques de publicación excesiva, habilite las propiedades específicas a las que quiere enlazarse. Para obtener 
        // más detalles, vea https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "idAdelento,CedulaTra,Monto,FechaAdelanto,EmisorAdelento")] Tbl_Adelantos tbl_Adelantos)
        {
            if (ModelState.IsValid)
            {
                db.Tbl_Adelantos.Add(tbl_Adelantos);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.CedulaTra = new SelectList(db.Tbl_Trabajador, "CedulaTra", "Nombre", tbl_Adelantos.CedulaTra);
            return View(tbl_Adelantos);
        }

        // GET: Adelantos/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Tbl_Adelantos tbl_Adelantos = db.Tbl_Adelantos.Find(id);
            if (tbl_Adelantos == null)
            {
                return HttpNotFound();
            }
            ViewBag.CedulaTra = new SelectList(db.Tbl_Trabajador, "CedulaTra", "Nombre", tbl_Adelantos.CedulaTra);
            return View(tbl_Adelantos);
        }

        // POST: Adelantos/Edit/5
        // Para protegerse de ataques de publicación excesiva, habilite las propiedades específicas a las que quiere enlazarse. Para obtener 
        // más detalles, vea https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "idAdelento,CedulaTra,Monto,FechaAdelanto,EmisorAdelento")] Tbl_Adelantos tbl_Adelantos)
        {
            if (ModelState.IsValid)
            {
                db.Entry(tbl_Adelantos).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.CedulaTra = new SelectList(db.Tbl_Trabajador, "CedulaTra", "Nombre", tbl_Adelantos.CedulaTra);
            return View(tbl_Adelantos);
        }

        // GET: Adelantos/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Tbl_Adelantos tbl_Adelantos = db.Tbl_Adelantos.Find(id);
            if (tbl_Adelantos == null)
            {
                return HttpNotFound();
            }
            return View(tbl_Adelantos);
        }

        // POST: Adelantos/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Tbl_Adelantos tbl_Adelantos = db.Tbl_Adelantos.Find(id);
            db.Tbl_Adelantos.Remove(tbl_Adelantos);
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
