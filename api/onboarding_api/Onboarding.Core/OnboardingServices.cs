using Onboarding.DB;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Onboarding.Core
{
    public class OnboardingServices : IOnboardingServices
    {
        private AppDbContext _context;
        public OnboardingServices(AppDbContext context)
        {
            _context = context;
        }

        // Customers
        public Customer CreateCustomer(Customer customer)
        {
            _context.Add(customer);
            _context.SaveChanges();

            return customer;
        }

        public void DeleteCustomer(Customer customer)
        {
            _context.Customers.Remove(customer);
            _context.SaveChanges();
        }

        public Customer EditCustomer(Customer customer)
        {
            var dbCustomer = _context.Customers.First(e => e.CustomerId == customer.CustomerId);
            dbCustomer.CustomerName = customer.CustomerName;
            dbCustomer.CustomerAddress = customer.CustomerAddress;
            _context.SaveChanges();

            return dbCustomer;
        }

        /*
        public Customer GetCustomer(int CustomerId)
        {
            return _context.Customers.First(e => e.CustomerId == CustomerId);
        }
        */

        public List<Customer> GetCustomers()
        {
            return _context.Customers.ToList();
        }

        // Products
        public Product CreateProduct(Product product)
        {
            _context.Add(product);
            _context.SaveChanges();

            return product;
        }

        public void DeleteProduct(Product product)
        {
            _context.Products.Remove(product);
            _context.SaveChanges();
        }

        public Product EditProduct(Product product)
        {
            var dbProduct = _context.Products.First(e => e.ProductId == product.ProductId);
            dbProduct.ProductName = product.ProductName;
            dbProduct.ProductPrice = product.ProductPrice;
            _context.SaveChanges();

            return dbProduct;
        }

        public List<Product> GetProducts()
        {
            return _context.Products.ToList();
        }

        // Stores
        public Store CreateStore(Store store)
        {
            _context.Add(store);
            _context.SaveChanges();

            return store;
        }

        public void DeleteStore(Store store)
        {
            _context.Stores.Remove(store);
            _context.SaveChanges();
        }

        public Store EditStore(Store store)
        {
            var dbStore = _context.Stores.First(e => e.StoreId == store.StoreId);
            dbStore.StoreName = store.StoreName;
            dbStore.StoreAddress = store.StoreAddress;
            _context.SaveChanges();

            return dbStore;
        }

        public List<Store> GetStores()
        {
            return _context.Stores.ToList();
        }

        // Sales
        public Sales CreateSale(Sales sale)
        {
            _context.Add(sale);
            _context.SaveChanges();

            return sale;
        }

        public void DeleteSale(Sales sale)
        {
            _context.Sales.Remove(sale);
            _context.SaveChanges();
        }

        public Sales EditSale(Sales sale)
        {
            var dbSales = _context.Sales.First(e => e.SalesId == sale.SalesId);
            dbSales.Product = sale.Product;
            dbSales.Customer = sale.Customer;
            dbSales.Store = sale.Store;
            dbSales.DateSold = sale.DateSold;
            _context.SaveChanges();

            return dbSales;
        }

        public List<Sales> GetSales()
        {
            return _context.Sales.ToList();
        }

    }
}
