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

    public class StoreController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public StoreController(IConfiguration configuration)
        {
            _configuration = configuration;
        }


        // API Method to GET Data from Store Table
        [HttpGet]
        public JsonResult Get()
        {
            string query = @"select StoreId, StoreName, StoreAddress from dbo.Store";
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
        public JsonResult Post(Store store)
        {
            string query = @"insert into dbo.Store (StoreName, StoreAddress) 
                         values (@StoreName, @StoreAddress)";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("Onboarding");
            SqlDataReader myReader;

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@StoreName", store.StoreName);
                    myCommand.Parameters.AddWithValue("@StoreAddress", store.StoreAddress);
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
        public JsonResult Put(Store store)
        {
            string query = @"update dbo.Store 
                           set StoreName=@StoreName, StoreAddress=@StoreAddress
                           where StoreId=@StoreId";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("Onboarding");
            SqlDataReader myReader;

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@StoreId", store.StoreId);
                    myCommand.Parameters.AddWithValue("@StoreName", store.StoreName);
                    myCommand.Parameters.AddWithValue("@StoreAddress", store.StoreAddress);
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
            string query = @"delete from dbo.Store where StoreId=@StoreId";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("Onboarding");
            SqlDataReader myReader;

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("StoreId", id);
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
    public class StoreController : ControllerBase
    {
        private IOnboardingServices _onboardingServices;
        public StoreController(IOnboardingServices onboardingServices)
        {
            _onboardingServices = onboardingServices;
        }

        [HttpGet]
        public IActionResult GetStores()
        {
            return Ok(_onboardingServices.GetStores());
        }


        [HttpPost]
        public IActionResult CreateStore(Store store)
        {
            var newStore = _onboardingServices.CreateStore(store);

            return CreatedAtAction("GetStore", new { newStore.StoreId }, newStore);
        }

        [HttpDelete]
        public IActionResult DeleteStore(Store store)
        {
            _onboardingServices.DeleteStore(store);
            return Ok();
        }

        [HttpPut]
        public IActionResult EditStore(Store store)
        {
            return Ok(_onboardingServices.EditStore(store));
        }
    }
}

