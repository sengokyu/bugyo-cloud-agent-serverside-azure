### ストレージ
###
resource "azurerm_storage_account" "bca" {
  name                     = "bugyocloudagent"
  resource_group_name      = azurerm_resource_group.bca.name
  location                 = local.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
}
