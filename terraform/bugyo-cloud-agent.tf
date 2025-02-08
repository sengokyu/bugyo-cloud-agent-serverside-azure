resource "azurerm_resource_group" "bca" {
  name     = "bugyo-cloud-agent"
  location = local.location
}

### ストレージ
###
resource "azurerm_storage_account" "bca" {
  name                     = "bugyocloudagent"
  resource_group_name      = azurerm_resource_group.bca.name
  location                 = local.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
}

### App プラン
###
resource "azurerm_service_plan" "bca" {
  name                = "bugyo-cloud-agent"
  resource_group_name = azurerm_resource_group.bca.name
  location            = local.location
  os_type             = "Linux"
  sku_name            = "Y1"
}

### Function
###
resource "azurerm_linux_function_app" "bca" {
  name                          = "bugyo-cloud-agent"
  resource_group_name           = azurerm_resource_group.bca.name
  location                      = local.location
  service_plan_id               = azurerm_service_plan.bca.id
  storage_account_name          = azurerm_storage_account.bca.name
  storage_uses_managed_identity = true
  https_only                    = true
  builtin_logging_enabled       = false

  site_config {
    cors {
      allowed_origins = ["https://sengokyu.cc"]
    }
    http2_enabled = true
  }

  identity {
    type = "SystemAssigned"
  }
}

### ロール割り当て Function -> Storage
###
resource "azurerm_role_assignment" "bca_function_storage" {
  scope                = azurerm_storage_account.bca.id
  principal_id         = azurerm_linux_function_app.bca.identity[0].principal_id
  role_definition_name = "Storage Blob Data Contributor"
}

