using Homework_3._18._24.Data;
using Homework_3._18._24.Web.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Diagnostics;

namespace Homework_3._18._24.Web.Controllers
{
    public class HomeController : Controller
    {
        private string _connectionString = @"Data Source=.\sqlexpress; Initial Catalog=HomeWork; Integrated Security=true;";
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult GetPeople()
        {
            var repo = new PersonRepository(_connectionString);
            List<Person> people = repo.GetAll();
            return Json(people);
        }

        public IActionResult GetPersonById(int id)
        {
            var repo = new PersonRepository(_connectionString);
            Person person = repo.GetPersonById(id);
            return Json(person);
        }

        [HttpPost]
        public IActionResult AddPerson(Person p)
        {
            var repo = new PersonRepository(_connectionString);
            repo.Add(p);
            return Json(p);
        }

        [HttpPost]
        public IActionResult DeletePerson(int id)
        {
            var repo = new PersonRepository(_connectionString);
            repo.Delete(id);
            return Redirect("/");
        }

        [HttpPost]
        public IActionResult UpdatePerson(Person p)
        {
            var repo = new PersonRepository(_connectionString);
            repo.Update(p);
            return Json(p);
        }
    }
}