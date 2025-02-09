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
  zip_deploy_file               = archive_file.bca.output_path

  site_config {
    http2_enabled = true
    app_service_logs {
      retention_period_days = 1
    }
    application_stack {
      node_version = "20"
    }
    cors {
      allowed_origins = ["https://sengokyu.cc"]
    }
  }

  app_settings = {
    FUNCTIONS_WORKER_RUNTIME = "node"
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

