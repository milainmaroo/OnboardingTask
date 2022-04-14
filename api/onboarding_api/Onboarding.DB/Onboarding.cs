using System;
using System.ComponentModel.DataAnnotations;

namespace Onboarding.DB
{
    public class Customer
    {
        [Key]
        public int CustomerId { get; set; }
        public string CustomerName { get; set; }
        public string CustomerAddress { get; set; }
    }

    public class Product
    {
        [Key]
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public decimal ProductPrice { get; set; }
    }

    public class Store
    {
        [Key]
        public int StoreId { get; set; }
        public string StoreName { get; set; }
        public string StoreAddress { get; set; }
    }

    public class Sales
    {
        [Key]
        public int SalesId { get; set; }
        public string Product { get; set; }
        public string Customer { get; set; }
        public string Store { get; set; }
        public string DateSold { get; set; }
    }
}

