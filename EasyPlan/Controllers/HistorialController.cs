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
    public class HistorialController : Controller
    {
        private easyplanEntities db = new easyplanEntities();

        // GET: Historial
        public ActionResult Index()
        {
            return View(db.Tbl_Historial.ToList());
        }

        // GET: Historial/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Tbl_Historial tbl_Historial = db.Tbl_Historial.Find(id);
            if (tbl_Historial == null)
            {
                return HttpNotFound();
            }
            return View(tbl_Historial);
        }

        // GET: Historial/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Historial/Create
        // Para protegerse de ataques de publicación excesiva, habilite las propiedades específicas a las que quiere enlazarse. Para obtener 
        // más detalles, vea https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "idRegistro,Registro")] Tbl_Historial tbl_Historial)
        {
            if (ModelState.IsValid)
            {
                db.Tbl_Historial.Add(tbl_Historial);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(tbl_Historial);
        }

        // GET: Historial/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Tbl_Historial tbl_Historial = db.Tbl_Historial.Find(id);
            if (tbl_Historial == null)
            {
                return HttpNotFound();
            }
            return View(tbl_Historial);
        }

        // POST: Historial/Edit/5
        // Para protegerse de ataques de publicación excesiva, habilite las propiedades específicas a las que quiere enlazarse. Para obtener 
        // más detalles, vea https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "idRegistro,Registro")] Tbl_Historial tbl_Historial)
        {
            if (ModelState.IsValid)
            {
                db.Entry(tbl_Historial).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(tbl_Historial);
        }

        // GET: Historial/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Tbl_Historial tbl_Historial = db.Tbl_Historial.Find(id);
            if (tbl_Historial == null)
            {
                return HttpNotFound();
            }
            return View(tbl_Historial);
        }

        // POST: Historial/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Tbl_Historial tbl_Historial = db.Tbl_Historial.Find(id);
            db.Tbl_Historial.Remove(tbl_Historial);
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
