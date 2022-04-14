using Onboarding.DB;
using System.Collections.Generic;


namespace Onboarding.Core
{
    public interface IOnboardingServices
    {
        //Customers
        List<Customer> GetCustomers();

        //Customer GetCustomer(int CustomerId);

        Customer CreateCustomer(Customer customer);

        void DeleteCustomer(Customer customer);

        Customer EditCustomer(Customer customer);


        // Products
        List<Product> GetProducts();

        Product CreateProduct(Product product);

        void DeleteProduct(Product product);

        Product EditProduct(Product product);

        // Stores
        List<Store> GetStores();

        Store CreateStore(Store store);

        void DeleteStore(Store store);

        Store EditStore(Store store);

        // Sales
        List<Sales> GetSales();

        Sales CreateSale(Sales sale);

        void DeleteSale(Sales sale);

        Sales EditSale(Sales sale);
    }
}
