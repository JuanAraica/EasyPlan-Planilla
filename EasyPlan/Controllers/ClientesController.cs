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
    public class ClientesController : Controller
    {
        private easyplanEntities db = new easyplanEntities();

        // GET: Clientes
        public ActionResult Index()
        {
            return View(db.Tbl_Clientes.ToList());
        }

        // GET: Clientes/Details/5
        public ActionResult Details(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Tbl_Clientes tbl_Clientes = db.Tbl_Clientes.Find(id);
            if (tbl_Clientes == null)
            {
                return HttpNotFound();
            }
            return View(tbl_Clientes);
        }

        // GET: Clientes/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Clientes/Create
        // Para protegerse de ataques de publicación excesiva, habilite las propiedades específicas a las que quiere enlazarse. Para obtener 
        // más detalles, vea https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "NombreCliente,Contacto,Direccion,Telefono,Email,Proyecto")] Tbl_Clientes tbl_Clientes)
        {
            if (ModelState.IsValid)
            {
                db.Tbl_Clientes.Add(tbl_Clientes);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(tbl_Clientes);
        }

        // GET: Clientes/Edit/5
        public ActionResult Edit(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Tbl_Clientes tbl_Clientes = db.Tbl_Clientes.Find(id);
            if (tbl_Clientes == null)
            {
                return HttpNotFound();
            }
            return View(tbl_Clientes);
        }

        // POST: Clientes/Edit/5
        // Para protegerse de ataques de publicación excesiva, habilite las propiedades específicas a las que quiere enlazarse. Para obtener 
        // más detalles, vea https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "NombreCliente,Contacto,Direccion,Telefono,Email,Proyecto")] Tbl_Clientes tbl_Clientes)
        {
            if (ModelState.IsValid)
            {
                db.Entry(tbl_Clientes).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(tbl_Clientes);
        }

        // GET: Clientes/Delete/5
        public ActionResult Delete(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Tbl_Clientes tbl_Clientes = db.Tbl_Clientes.Find(id);
            if (tbl_Clientes == null)
            {
                return HttpNotFound();
            }
            return View(tbl_Clientes);
        }

        // POST: Clientes/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(string id)
        {
            Tbl_Clientes tbl_Clientes = db.Tbl_Clientes.Find(id);
            db.Tbl_Clientes.Remove(tbl_Clientes);
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
