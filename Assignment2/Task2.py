#Task 2

class BankAccount: 
    def __init__(self, account_number, balance, account_holder):
        self.account_number = account_number
        self.balance = balance
        self.account_holder = account_holder

#Method for depositing money.
    def deposit_money(self, deposit):
        self.balance += deposit


#Method for withdrawing money, ensuring balance doesn't go negative.
    def withdraw_money(self, withdraw_amount):
        if self.balance >= withdraw_amount:
            self.balance -= withdraw_amount 
        else:
            raise ValueError("Insufficient balance to withdraw the requested amount.")
        
#Method for displaying the account's details.
    def display_details(self):
        return f"Account Number: {self.account_number}, Balance: {self.balance}, Account Holder: {self.account_holder}"
 
 

basma_account = BankAccount(account_number=400067298378926, balance=30000, account_holder="Basma Alhajji")
# Deposit money
basma_account.deposit_money(130000)  
print(basma_account.display_details())

# Withdraw money
basma_account.withdraw_money(500)
print(basma_account.display_details())
