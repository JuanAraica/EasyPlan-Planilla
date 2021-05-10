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
    public class SalarioController : Controller
    {
        private easyplanEntities db = new easyplanEntities();

        // GET: Salario
        public ActionResult Index()
        {
            var tbl_Salario = db.Tbl_Salario.Include(t => t.Tbl_Trabajador);
            return View(tbl_Salario.ToList());
        }

        // GET: Salario/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Tbl_Salario tbl_Salario = db.Tbl_Salario.Find(id);
            if (tbl_Salario == null)
            {
                return HttpNotFound();
            }
            return View(tbl_Salario);
        }

        // GET: Salario/Create
        public ActionResult Create()
        {
            ViewBag.CedulaTra = new SelectList(db.Tbl_Trabajador, "CedulaTra", "Nombre");
            return View();
        }

        // POST: Salario/Create
        // Para protegerse de ataques de publicación excesiva, habilite las propiedades específicas a las que quiere enlazarse. Para obtener 
        // más detalles, vea https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "idSalario,CedulaTra,SalarioBruto,Seguro,Prestamos,Adelantos,Otros,SalarioNeto,PrimeraFecha,UltimaFecha,TotalDeducciones,FechaSalario")] Tbl_Salario tbl_Salario)
        {
            if (ModelState.IsValid)
            {
                db.Tbl_Salario.Add(tbl_Salario);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.CedulaTra = new SelectList(db.Tbl_Trabajador, "CedulaTra", "Nombre", tbl_Salario.CedulaTra);
            return View(tbl_Salario);
        }

        // GET: Salario/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Tbl_Salario tbl_Salario = db.Tbl_Salario.Find(id);
            if (tbl_Salario == null)
            {
                return HttpNotFound();
            }
            ViewBag.CedulaTra = new SelectList(db.Tbl_Trabajador, "CedulaTra", "Nombre", tbl_Salario.CedulaTra);
            return View(tbl_Salario);
        }

        // POST: Salario/Edit/5
        // Para protegerse de ataques de publicación excesiva, habilite las propiedades específicas a las que quiere enlazarse. Para obtener 
        // más detalles, vea https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "idSalario,CedulaTra,SalarioBruto,Seguro,Prestamos,Adelantos,Otros,SalarioNeto,PrimeraFecha,UltimaFecha,TotalDeducciones,FechaSalario")] Tbl_Salario tbl_Salario)
        {
            if (ModelState.IsValid)
            {
                db.Entry(tbl_Salario).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.CedulaTra = new SelectList(db.Tbl_Trabajador, "CedulaTra", "Nombre", tbl_Salario.CedulaTra);
            return View(tbl_Salario);
        }

        // GET: Salario/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Tbl_Salario tbl_Salario = db.Tbl_Salario.Find(id);
            if (tbl_Salario == null)
            {
                return HttpNotFound();
            }
            return View(tbl_Salario);
        }

        // POST: Salario/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Tbl_Salario tbl_Salario = db.Tbl_Salario.Find(id);
            db.Tbl_Salario.Remove(tbl_Salario);
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
