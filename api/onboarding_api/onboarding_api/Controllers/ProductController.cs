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

    public class ProductController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public ProductController(IConfiguration configuration)
        {
            _configuration = configuration;
        }


        // API Method to GET Data from Product Table
        [HttpGet]
        public JsonResult Get()
        {
            string query = @"select ProductId, ProductName, ProductPrice from dbo.Product";
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
        public JsonResult Post(Product pro)
        {
            string query = @"insert into dbo.Product (ProductName, ProductPrice) 
                         values (@ProductName, @ProductPrice)";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("Onboarding");
            SqlDataReader myReader;

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@ProductName", pro.ProductName);
                    myCommand.Parameters.AddWithValue("@ProductPrice", pro.ProductPrice);
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
        public JsonResult Put(Product pro)
        {
            string query = @"update dbo.Product 
                           set ProductName=@ProductName, ProductPrice=@ProductPrice
                           where ProductId=@ProductId";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("Onboarding");
            SqlDataReader myReader;

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@ProductId", pro.ProductId);
                    myCommand.Parameters.AddWithValue("@ProductName", pro.ProductName);
                    myCommand.Parameters.AddWithValue("@ProductPrice", pro.ProductPrice);
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
            string query = @"delete from dbo.Product where ProductId=@ProductId";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("Onboarding");
            SqlDataReader myReader;

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("ProductId", id);
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
    public class ProductController : ControllerBase
    {
        private IOnboardingServices _onboardingServices;
        public ProductController(IOnboardingServices onboardingServices)
        {
            _onboardingServices = onboardingServices;
        }

        [HttpGet]
        public IActionResult GetProducts()
        {
            return Ok(_onboardingServices.GetProducts());
        }


        [HttpPost]
        public IActionResult CreateProduct(Product product)
        {
            var newProduct = _onboardingServices.CreateProduct(product);
            return CreatedAtAction("GetProduct", new { newProduct.ProductId }, newProduct);
        }

        [HttpDelete]
        public IActionResult DeleteProduct(Product product)
        {
            _onboardingServices.DeleteProduct(product);
            return Ok();
        }

        [HttpPut]
        public IActionResult EditProduct(Product product)
        {
            return Ok(_onboardingServices.EditProduct(product));
        }
    }
}


