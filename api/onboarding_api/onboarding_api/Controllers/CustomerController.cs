using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Onboarding.Core;
using Onboarding.DB;
//using onboarding_api.Models;

/*
namespace onboarding_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class CustomerController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public CustomerController(IConfiguration configuration)
        {
            _configuration = configuration;
        }


        // API Method to GET Data from Customer Table
        [HttpGet]
        public JsonResult Get()
        {
            string query = @"select CustomerId, CustomerName, CustomerAddress from dbo.Customer";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("Onboarding");
            SqlDataReader myReader;

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);

        }

        // POST Method to insert new record
        [HttpPost]
        public JsonResult Post(Customer cust)
        {
            string query = @"insert into dbo.Customer (CustomerName, CustomerAddress) 
                         values (@CustomerName, @CustomerAddress)";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("Onboarding");
            SqlDataReader myReader;

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@CustomerName", cust.CustomerName);
                    myCommand.Parameters.AddWithValue("@CustomerAddress", cust.CustomerAddress);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Added Successfully");
        }

        // PUT Method to update record
        [HttpPut]
        public JsonResult Put(Customer cust)
        {
            string query = @"update dbo.Customer 
                           set CustomerName=@CustomerName, CustomerAddress=@CustomerAddress
                           where CustomerId=@CustomerId";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("Onboarding");
            SqlDataReader myReader;

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@CustomerId", cust.CustomerId);
                    myCommand.Parameters.AddWithValue("@CustomerName", cust.CustomerName);
                    myCommand.Parameters.AddWithValue("@CustomerAddress", cust.CustomerAddress);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Updated Successfully");
        }

        // DELETE Method
        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"delete from dbo.Customer where CustomerId=@CustomerId";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("Onboarding");
            SqlDataReader myReader;

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("CustomerId", id);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Deleted Successfully");
        }
    }
}
*/



namespace onboarding_api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CustomerController : ControllerBase
    {
        private IOnboardingServices _onboardingServices;
        public CustomerController(IOnboardingServices onboardingServices)
        {
            _onboardingServices = onboardingServices;
        }

        [HttpGet]
        public IActionResult GetCustomers()
        {
            return Ok(_onboardingServices.GetCustomers());
        }

        /*
        [HttpGet("{id}", Name = "GetCustomer")]
        public IActionResult GetCustomer(int CustomerId)
        {
            return Ok(_onboardingServices.GetCustomer(CustomerId));
        }
        */

        [HttpPost]
        public IActionResult CreateCustomer(Customer customer)
        {
            var newCustomer = _onboardingServices.CreateCustomer(customer);
            //return CreatedAtRoute("GetCustomer", new { newCustomer.CustomerId }, newCustomer);
            return CreatedAtAction("GetCustomer", new { newCustomer.CustomerId }, newCustomer);
        }

        [HttpDelete]
        public IActionResult DeleteCustomer(Customer customer)
        {
            _onboardingServices.DeleteCustomer(customer);
            return Ok();
        }

        [HttpPut]
        public IActionResult EditCustomer(Customer customer)
        {
            return Ok(_onboardingServices.EditCustomer(customer));
        }
    }
}


